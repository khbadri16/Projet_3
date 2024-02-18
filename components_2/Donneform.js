"use client";
import { db } from "@/app/firebase/config";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Donneform() {
  const [username, setusername] = useState("");
  const [phone_1, setphone_1] = useState("");
  const [phone_2, setphone_2] = useState("");
  const [email, setemail] = useState("");
  const [type, settype] = useState("");
  const [documentCount, setDocumentCount] = useState(0);

  const getDocumentCount = async (setDocumentCount) => {
    const sangCollection = collection(db, "Sang");

    const unsubscribe = onSnapshot(sangCollection, (querySnapshot) => {
      setDocumentCount(querySnapshot.size);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    getDocumentCount(setDocumentCount);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(06|07|05)\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      if (!validateEmail(email)) {
        toast.error(
          "Adresse e-mail invalide. Veuillez saisir une adresse e-mail valide."
        );
        return;
      }
    }

    if (!validatePhoneNumber(phone_1)) {
      toast.error(
        "Numéro de téléphone invalide. Veuillez saisir un numéro valide commençant par 06, 07, ou 05 et contient 10 chiffre"
      );
      return;
    }
    if (phone_2) {
      if (!validatePhoneNumber(phone_2)) {
        toast.error(
          "Numéro de téléphone invalide. Veuillez saisir un numéro valide commençant par 06, 07, ou 05 et contient 10 chiffre"
        );
        return;
      }
    }

    const sangCollection = collection(db, "Sang");

    const data = {
      Email: email,
      Type: type,
      phone_1: phone_1,
      phone_2: phone_2,
      username: username,
    };

    const sangRef = doc(sangCollection, phone_1);

    await setDoc(sangRef, data);

    setusername("");
    setphone_1("");
    setphone_2("");
    setemail("");
    settype("");

    toast.success("Les données ont été soumises avec succès! Merci");
  };
  return (
    <>
      <div className="reglage">
        <div className="container_2">
          <h2 className="form-title">Blood Donation Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber1" className="form-label">
                Phone Number 1
              </label>
              <input
                type="tel"
                id="phoneNumber1"
                name="phoneNumber1"
                className="form-input"
                value={phone_1}
                onChange={(e) => setphone_1(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber2" className="form-label">
                Phone Number 2
              </label>
              <input
                type="tel"
                id="phoneNumber2"
                name="phoneNumber2"
                className="form-input"
                value={phone_2}
                onChange={(e) => setphone_2(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bloodType" className="form-label">
                Le groupe sanguin
              </label>
              <select
                id="bloodType"
                name="bloodType"
                className="form-input"
                value={type}
                onChange={(e) => settype(e.target.value)}
                required
              >
                <option value="" disabled>
                  Sélectionner le groupe sanguin
                </option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
        <div className="count-container">
          <p className="count-text">Nombre de personnes inscrites </p>
          <p className="count-number">{documentCount}</p>
        </div>
      </div>
    </>
  );
}
