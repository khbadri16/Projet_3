"use client";
import { db } from "@/app/firebase/config";
import {
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ShowdemanMed() {
  const [demande, setDemande] = useState(null);

  useEffect(() => {
    async function fetchDemandes() {
      try {
        const eventCollection = collectionGroup(db, "demandes");
        const q = query(
          eventCollection,
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const demandeList = querySnapshot.docs.map((doc) => doc.data());
          console.log("Fetched demandes:", demandeList);
          setDemande(demandeList);
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
      <Demandespr demanme={demande} />
    </>
  );
}

function Demandespr({ demanme }) {
  return demanme
    ? demanme.map((demand) => <Demandes demand={demand} key={demand.name} />)
    : null;
}

function Demandes({ demand }) {
  const Delete = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      const DemandRef = doc(db, "Med", demand.Produit, "demandes", demand.name);
      await deleteDoc(DemandRef);
      toast("Demande suprimer", { icon: "🗑️" });
    }
  };

  return (
    <>
      <div className="cardd">
        <h2>{demand.name}</h2>
        <h2>{demand.phone}</h2>
        <strong>{demand.Produit}</strong>
        <button onClick={Delete} className="btn-red">
          Supprimer
        </button>
      </div>
    </>
  );
}
