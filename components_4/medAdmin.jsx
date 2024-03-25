"use client";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import Loading from "./Loadin";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import toast from "react-hot-toast";

export default function ShowMedAdmin() {
  const [medicaments, setMedicaments] = useState(null);

  useEffect(() => {
    async function fetchMed() {
      try {
        const Collection = collection(db, "Med");
        const q = query(Collection);
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const MedList = querySnapshot.docs.map((doc) => doc.data());
          console.log("Fetched Med:", MedList);
          setMedicaments(MedList);
        } else {
          console.log("No partners found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchMed();
  }, []);

  if (!medicaments) {
    return <Loading />;
  }
  return <Medadmin medicaments={medicaments} />;
}

export function Medadmin({ medicaments }) {
  return (
    <>
      <table className="demande-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medicaments.map((med, index) => (
            <ChangeNbproduit key={med.name} med={med} index={index} />
          ))}
        </tbody>
      </table>
      <div style={{ height: "100px" }}></div>
    </>
  );
}

function ChangeNbproduit({ med, index }) {
  const [newCount, setNewCount] = useState(med.nb);

  const Delete = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      const medRef = doc(db, "Med", med.name);
      await deleteDoc(medRef);
      toast("Produit suprimer", { icon: "🗑️" });
    }
  };

  const handleCountUpdate = async () => {
    const medDocRef = doc(db, "Med", med.name);

    try {
      await updateDoc(medDocRef, {
        nb: newCount,
      });
      toast.success("Nombre total de produit mis à jour avec succès !");

      console.log("NombreTotall document updated successfully!");
    } catch (error) {
      console.error("Error updating NombreTotall document:", error);
    }
  };

  return (
    <>
      <tr>
        <td data-cell="#">{index + 1}</td>
        <td data-cell="Nom">{med.name}</td>
        <td data-cell="number">
          <input
            type="number"
            value={newCount < 0 ? 0 : newCount}
            onChange={(e) => setNewCount(Math.max(0, Number(e.target.value)))}
            className="smallinput"
          />
        </td>
        <td data-cell="Action">
          <div style={{ display: "inline-block" }}>
            <button onClick={handleCountUpdate} className="btn-green">
              Update number
            </button>
            <button onClick={Delete} className="btn-red">
              Supprimer
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
