"use client";
import { db } from "@/app/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Maisonformulaire() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phone_1, setphone_1] = useState("");
  const [email, setemail] = useState("");
  const [documents, setDocumentCount] = useState(0);

  const getDocumentCount = async (setDocumentCount) => {
    const maisonCollection = collection(db, "Maison");
    const maisonQuery = query(maisonCollection, where("Etat", "==", true));

    const maisonUnsubscribe = onSnapshot(maisonQuery, (maisonSnapshot) => {
      const maisonCount = maisonSnapshot.size;

      const nbmaisonDocRef = doc(db, "NBmaison", "NombreTotall");
      const nbmaisonUnsubscribe = onSnapshot(nbmaisonDocRef, (nbmaisonDoc) => {
        const totalPlaces = nbmaisonDoc.data().count;

        const documentCount = totalPlaces - maisonCount;

        setDocumentCount(documentCount);
      });
    });

    return () => {
      maisonUnsubscribe();
    };
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

    if (!validatePhoneNumber(phone_1)) {
      toast.error(
        "Numéro de téléphone invalide. Veuillez saisir un numéro valide commençant par 06, 07, ou 05 et contient 10 chiffre"
      );
      return;
    }

    const ref = collection(db, "Maison");

    const data = {
      Email: email,
      phone_1: phone_1,
      Nom: nom,
      Prénom: prenom,
      Etat: false,
      createdAt: serverTimestamp(),
    };

    const maisonRef = doc(ref, phone_1);

    await setDoc(maisonRef, data);

    setphone_1("");
    setemail("");
    setNom("");
    setPrenom("");

    toast.success("Les demande ont été soumises avec succès! Merci");
  };
  return (
    <>
      <div className="reglage">
        <div className="container_2">
          <h2 className="form-title">Formulaire de Demande de Réservation</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Nom
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Prénom
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber1" className="form-label">
                Numéro de téléphone
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
              <label htmlFor="email" className="form-label">
                Email (optionelle)
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

            <button type="submit" className="submit-buttonf">
              Submit
            </button>
          </form>
        </div>
        <div className="count-container">
          <p className="count-text">Nombre de place disponible au maison</p>
          <p className="count-numberf">{documents}</p>
        </div>
      </div>
    </>
  );
}
