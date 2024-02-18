"use client";
import AuthCheck from "@/componenets/Authcheck";
import React, { useContext, useEffect, useState } from "react";
import useUserdata from "@/lib/hooks";
import { UserContext } from "@/lib/context";
import { auth, db } from "../firebase/config";
import { useRouter } from "next/navigation";
import kebabCase from "lodash.kebabcase";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

export default function editpost(props) {
  const userData = useUserdata();
  return (
    <UserContext.Provider value={userData}>
      <CreateNewPost />
    </UserContext.Provider>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  useEffect(() => {
    const fetchCategories = async () => {
      const CategoryCollection = await getDocs(collection(db, "Category"));

      const CategoryData = CategoryCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(CategoryData);
    };

    fetchCategories();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);
    const ref = doc(collection(userRef, "posts"), slug);

    const data = {
      title,
      slug,
      uid,
      username,
      content: " Écris ton article ",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
      category: selectedCategory,
    };

    await setDoc(ref, data);

    toast.success("Post created!");

    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <select
        id="categorySelect"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="custom-select"
      >
        <option value="">Select a Category</option>
        {categories.map((Category) => (
          <option key={Category.id} value={Category.name}>
            {Category.name}
          </option>
        ))}
      </select>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="le titre de l'article"
        //className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
}
