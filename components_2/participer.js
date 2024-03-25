import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import toast from "react-hot-toast";

export default function ParticiperEvent({ event }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleParticipation = async () => {
    try {
      const participantsCollectionRef = collection(event, "participant");

      const participantDocRef = doc(participantsCollectionRef, phoneNumber);

      await setDoc(participantDocRef, {
        nom: nom,
        prenom: prenom,
        phoneNumber: phoneNumber,
      });

      setNom("");
      setPrenom("");
      setPhoneNumber("");

      toast.success("Merci pour votre participation");

      console.log("Participant added successfully!");
    } catch (error) {
      console.error("Error adding participant: ", error);
    }
  };

  return (
    <div className="participation-form">
      <h2>Participer à l'événement</h2>
      <div>
        <label>Nom:</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
      </div>
      <div>
        <label>Prénom:</label>
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
      </div>
      <div>
        <label>Numéro de téléphone:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button onClick={handleParticipation}>Participer</button>
    </div>
  );
}
