"use client";
import { db, storage } from "@/app/firebase/config";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Addpartner() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState(null);
  const [link1, setLink1] = useState(null);
  const [link2, setLink2] = useState(null);
  const [image, setImage] = useState("");

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadProfilePicture = async () => {
    try {
      const storageRef = ref(storage, `PartnersImages/${image.name}`);
      await uploadBytes(storageRef, image);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ref = collection(db, "Partner");

    const data = {
      name: name,
      descreption: text,
      Facebook: link,
      Instagram: link1,
      Youtube: link2,
      img: image ? await uploadProfilePicture() : null,
      createdAt: serverTimestamp(),
    };

    const PartnerRef = doc(ref, name);

    await setDoc(PartnerRef, data);

    setName("");
    setText("");
    setLink("");
    setLink1("");
    setLink2("");

    toast.success("...");
  };
  return (
    <div class="partner-form-container">
      <div class="partner-form">
        <h2 class="form-title">Ajouter un Partenaire</h2>
        <form class="form" onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="name" class="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="text" class="form-label">
              Text
            </label>
            <textarea
              id="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              class="form-textarea"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="link" class="form-label">
              Facbebook
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="link" class="form-label">
              Instagrame
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={link1}
              onChange={(e) => setLink1(e.target.value)}
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="link" class="form-label">
              Youtube
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={link2}
              onChange={(e) => setLink2(e.target.value)}
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="image" class="form-file-label">
              {image ? `Selected: ${image.name}` : "Add Partner Picture"}
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handlePictureUpload}
              class="form-file-input"
            />
          </div>
          <button type="submit" class="form-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
