"use client";
import AuthCheck from "@/componenets/Authcheck";
import React, { useContext, useEffect, useState } from "react";
import useUserdata from "@/lib/hooks";
import { UserContext } from "@/lib/context";
import { auth, db, storage } from "../firebase/config";
import { useRouter } from "next/navigation";
import kebabCase from "lodash.kebabcase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import AdminCheck from "@/componenets/Admincheck";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Editevent(props) {
  const userData = useUserdata();
  return (
    <UserContext.Provider value={userData}>
      <AdminCheck>
        <CreateNewevent />
      </AdminCheck>
    </UserContext.Provider>
  );
}

function CreateNewevent() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [prix, setPrix] = useState("");
  const [sex, setSex] = useState("");
  const [image, setImage] = useState("");

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadProfilePicture = async () => {
    try {
      const storageRef = ref(storage, `EventImages/${image.name}`);
      await uploadBytes(storageRef, image);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
      return null;
    }
  };

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
    const ref = collection(db, "Event");

    const data = {
      title,
      slug,
      uid,
      content: "Écris ton evenment",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
      category: selectedCategory,
      prix: prix,
      sex: sex,
      time: true,
      img: image ? await uploadProfilePicture() : null,
    };

    const eventRef = doc(ref, slug);

    await setDoc(eventRef, data);

    toast.success("event created");

    router.push(`/Event/${slug}`);
  };

  return (
    <form onSubmit={createPost} className="formmm">
      <select
        id="categorySelect"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="custom-select"
        required
      >
        <option value="">Select a Category</option>
        {categories.map((Category) => (
          <option key={Category.id} value={Category.name}>
            {Category.name}
          </option>
        ))}
      </select>

      <select
        id="genreType"
        name="genreType"
        className="custom-select"
        value={sex}
        onChange={(e) => setSex(e.target.value)}
        required
      >
        <option value="" disabled>
          Choisissez le genre des participants
        </option>
        <option value="Homme">Homme</option>
        <option value="Femme">Femme</option>
        <option value="Mixte">Mixte</option>
      </select>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="le titre de l'événement"
      />
      <input
        type="text"
        value={prix}
        onChange={(e) => setPrix(e.target.value)}
        placeholder="le prix de l'événement"
        pattern="[0-9]*"
        inputMode="numeric"
        required
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <div className="mb-4">
        <label
          htmlFor="image"
          className="w-full p-3 mb-4 bg-gray-700 rounded cursor-pointer text-white"
        >
          {image ? `Selected: ${image.name}` : "Add Covert Picture"}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handlePictureUpload}
          className="hidden"
        />
      </div>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Event
      </button>
    </form>
  );
}
