"use client";
import { db } from "@/app/firebase/config";
import AdminCheck from "@/componenets/Admincheck";
import ImageUploader from "@/componenets/ImageUploade";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

export default function Editpost({ params }) {
  const userData = useUserdata();
  const { slug } = params;

  return (
    <UserContext.Provider value={userData}>
      <AdminCheck>
        <EventManager slug={slug} />
      </AdminCheck>
    </UserContext.Provider>
  );
}

function EventManager({ slug }) {
  const [preview, setPreview] = useState(false);
  const [event, setEvent] = useState(null);
  const [eventRef, setEventRef] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventCollection = collection(db, "Event");
        const eventACollection = collection(db, "Event A");

        const q1 = query(eventCollection, where("slug", "==", slug));
        const q2 = query(eventACollection, where("slug", "==", slug));

        const [querySnapshot1, querySnapshot2] = await Promise.all([
          getDocs(q1),
          getDocs(q2),
        ]);

        let eventData = {};
        let eventRef;

        if (!querySnapshot1.empty) {
          const eventDoc = querySnapshot1.docs[0];
          eventData = eventDoc.data();
          eventRef = eventDoc.ref;
        } else if (!querySnapshot2.empty) {
          const eventDoc = querySnapshot2.docs[0];
          eventData = eventDoc.data();
          eventRef = eventDoc.ref;
        } else {
          console.log("No event found with the specified slug.");
          return;
        }

        setEvent(eventData);
        setEventRef(eventRef);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <main className="Container">
      {event && (
        <>
          <section>
            <h1>{event.title}</h1>
            <p>ID: {event.slug}</p>
            <EventForm
              eventRef={eventRef}
              defaultValues={event}
              preview={preview}
            />
          </section>

          <aside className="asside">
            <button onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </button>
            <DeleteEventButton eventRef={eventRef} />
          </aside>
        </>
      )}
    </main>
  );
}

function EventForm({ defaultValues, eventRef, preview }) {
  const router = useRouter();
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { isValid, isDirty } = formState;

  const updatePost = async ({ content }) => {
    await updateDoc(eventRef, {
      content,
      updatedAt: serverTimestamp(),
    });

    reset({ content });

    toast.success("Event updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)} className="formm">
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
          className="texter"
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

function DeleteEventButton({ eventRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      await deleteDoc(eventRef);
      router.push("/");
      toast("Event deleted", { icon: "🗑️" });
    }
  };

  return (
    <button className="btn-red" onClick={deletePost}>
      Delete
    </button>
  );
}
