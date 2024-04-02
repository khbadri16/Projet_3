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
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./Loadin";

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
  if (!demande) {
    return <Loading />;
  }

  return (
    <>
      <Demandespr demanme={demande} />
    </>
  );
}

function Demandespr({ demanme }) {
  return (
    <>
      <table className="demande-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Produit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {demanme.map((demand, index) => (
            <Demandes demand={demand} key={index} index={index} />
          ))}
        </tbody>
      </table>
      <div style={{ height: "100px" }}></div>
    </>
  );
}

function Demandes({ demand, index }) {
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
      <tr>
        <td data-cell="#">{index + 1}</td>
        <td data-cell="Nom">{demand.name}</td>
        <td data-cell="Telephone">{demand.phone}</td>
        <td data-cell="Produit">{demand.Produit}</td>
        <td data-cell="Action">
          <button onClick={Delete} className="btn-red">
            Supprimer
          </button>
        </td>
      </tr>
    </>
  );
}
