import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import toast from "react-hot-toast";

export default function ParticiperEvent({ event }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showForm, setShowForm] = useState(false);

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
      setShowForm(false);

      toast.success("Merci pour votre participation");

      console.log("Participant added successfully!");
    } catch (error) {
      console.error("Error adding participant: ", error);
    }
  };

  return (
    <div className="participer-container">
      <button onClick={() => setShowForm(true)} className="participer-button">
        Participer
      </button>

      {showForm && (
        <div className="participation-form-overlay">
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
            <div className="button-container">
              <button onClick={handleParticipation}>Participer</button>
              <button onClick={() => setShowForm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
