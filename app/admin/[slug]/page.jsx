"use client";
import { db } from "@/app/firebase/config";
import AuthCheck from "@/componenets/Authcheck";
import ImageUploader from "@/componenets/ImageUploade";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import {
  collectionGroup,
  deleteDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

export default function Editpost({ params }) {
  const userData = useUserdata();
  const { slug } = params;

  return (
    <UserContext.Provider value={userData}>
      <AuthCheck>
        <PostManager slug={slug} />
      </AuthCheck>
    </UserContext.Provider>
  );
}

function PostManager({ slug }) {
  const [preview, setPreview] = useState(false);
  const [post, setPost] = useState(null);
  const [postRef, setPostRef] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const postsCollection = collectionGroup(db, "posts");
      const q = query(postsCollection, where("slug", "==", slug));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const postDoc = querySnapshot.docs[0];
        const postData = postDoc.data();
        setPost(postData);

        const documentReference = postDoc.ref;
        setPostRef(documentReference);
      }
    };

    fetchData();
  }, [slug]);
  return (
    <main className="Container">
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>
            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside>
            <button onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </button>
            <DeletePostButton postRef={postRef} />
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const router = useRouter();
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { isValid, isDirty } = formState;

  const updatePost = async ({ content }) => {
    await updateDoc(postRef, {
      content,
      updatedAt: serverTimestamp(),
    });

    reset({ content });

    toast.success("Post updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="cardd">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}
      <div className={preview ? "hidden" : "controls"}>
        <ImageUploader />
        <textarea
          {...register("content", {
            maxLength: { value: 20000, message: "Content is too long" },
            minLength: { value: 10, message: "Content is too short" },
            required: { value: true, message: "Content is required" },
          })}
          style={{ width: "70%", minHeight: "100px" }}
        ></textarea>

        {errors && errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}

        <button
          type="submit"
          className="btn-green"
          disabled={!isDirty || !isValid}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

function DeletePostButton({ postRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      await deleteDoc(postRef);
      router.push("/");
      toast("post deleted", { icon: "🗑️" });
    }
  };

  return (
    <button className="btn-red" onClick={deletePost}>
      Delete
    </button>
  );
}
