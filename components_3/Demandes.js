"use client";

import { db } from "@/app/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Gestion_Demande() {
  const [demandes, setDemandes] = useState(null);

  useEffect(() => {
    async function fetchDemandes() {
      try {
        const eventCollection = collection(db, "Maison");
        const q = query(
          eventCollection,
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const demandeList = querySnapshot.docs.map((doc) => doc.data());
          console.log("Fetched Events:", demandeList);
          setDemandes(demandeList);
        } else {
          console.log("No demande found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchDemandes();
  }, []);

  return (
    <>
      <ChangeNbplace />
      <Demandespr demanmes={demandes} />
    </>
  );
}

function Demandespr({ demanmes }) {
  return demanmes
    ? demanmes.map((demande) => <Demandes demande={demande} key={demande.id} />)
    : null;
}

function Demandes({ demande }) {
  const router = useRouter();
  const [etat, setEtat] = useState(demande.Etat);

  const ChangeEtat = async () => {
    const maisonRef = doc(db, "Maison", demande.phone_1);

    await updateDoc(maisonRef, {
      Etat: !etat,
    });

    setEtat(!etat);
  };

  const Delete = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      const maisonRef = doc(db, "Maison", demande.phone_1);
      await deleteDoc(maisonRef);
      toast("Demande suprimer", { icon: "🗑️" });
    }
  };

  return (
    <>
      <div className="cardd">
        <strong>{demande.Prénom}</strong>
        <h2>{demande.Nom}</h2>
        <h2>{demande.phone_1}</h2>
        <button onClick={ChangeEtat} className="btn-green">
          {etat ? "Refuser" : "Accepter"}
        </button>
        <button onClick={Delete} className="btn-red">
          Supprimer
        </button>
      </div>
    </>
  );
}

function ChangeNbplace() {
  const [newCount, setNewCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const nbmaisonDocRef = doc(db, "NBmaison", "NombreTotall");
      const docSnapshot = await getDoc(nbmaisonDocRef);

      if (docSnapshot.exists()) {
        setNewCount(docSnapshot.data().count);
      }
    };

    fetchData();
  }, []);

  const handleCountUpdate = async () => {
    const nbmaisonDocRef = doc(db, "NBmaison", "NombreTotall");

    try {
      await updateDoc(nbmaisonDocRef, {
        count: newCount,
      });
      toast.success("Nombre total de places mis à jour avec succès !");

      console.log("NombreTotall document updated successfully!");
    } catch (error) {
      console.error("Error updating NombreTotall document:", error);
    }
  };

  return (
    <div className="change-co">
      <label className="nbtotall"> Nombre de place total :</label>
      <input
        type="number"
        value={newCount < 0 ? 0 : newCount}
        onChange={(e) => setNewCount(Math.max(0, Number(e.target.value)))}
        className="smallinput"
      />
      <button onClick={handleCountUpdate} className="btn-blue">
        Update Count
      </button>
    </div>
  );
}
