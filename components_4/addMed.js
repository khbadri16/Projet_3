"use client";
import { db, storage } from "@/app/firebase/config";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Addmedicament() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [number, setNumber] = useState("");
  const [medimage, setMedImage] = useState("");

  const handlePictureUploadd = (e) => {
    const file = e.target.files[0];
    setMedImage(file);
  };

  const uploadProfilePicture = async () => {
    try {
      const storageRef = ref(storage, `MedImages/${medimage.name}`);
      await uploadBytes(storageRef, medimage);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ref = collection(db, "Med");

    const data = {
      name: name,
      descreption: text,
      nb: number,
      img: medimage ? await uploadProfilePicture() : null,
      createdAt: serverTimestamp(),
    };

    const MedRef = doc(ref, name);

    await setDoc(MedRef, data);

    setName("");
    setText("");
    setNumber("");
    setMedImage("");

    toast.success("Le médicament a été ajouté avec succès !");
  };
  return (
    <div className="partner-form-container">
      <div className="partner-form">
        <h2 className="form-title">Ajouter un Medicament</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="text" className="form-label">
              Text
            </label>
            <textarea
              id="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="form-textarea"
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className="form-label">
              Quantité
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={number}
              onChange={(e) => {
                const value = Math.max(0, parseInt(e.target.value));
                setNumber(value);
              }}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="medimage" className="form-file-label">
              {medimage ? `Selected: ${medimage.name}` : "Add Med Picture"}
            </label>
            <input
              type="file"
              id="medimage"
              accept="image/*"
              onChange={handlePictureUploadd}
              className="form-file-input"
            />
          </div>
          <button type="submit" className="form-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
