"use client";
import { db } from "@/app/firebase/config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./Loadin";

export default function Showmember() {
  const [membre, setMember] = useState(null);
  const [commissionFilter, setCommissionFilter] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const q = collection(db, "users");
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const demandeList = querySnapshot.docs.map((doc) => doc.data());
          console.log("Fetched membres:", demandeList);
          setMember(demandeList);
        } else {
          console.log("No membre found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchMembers();
  }, []);

  const handleCommissionFilter = (commission) => {
    setCommissionFilter(commission);
  };

  const handleClearFilter = () => {
    setCommissionFilter(null);
  };

  if (!membre) {
    return <Loading />;
  }

  const filteredMembers = commissionFilter
    ? membre.filter((m) => m.commission === commissionFilter)
    : membre;

  return (
    <>
      <div className="button-mm">
        <button
          className="commission-button"
          onClick={() => handleCommissionFilter("Sensibilisation")}
        >
          Sensibilisation
        </button>
        <button
          className="commission-button"
          onClick={() => handleCommissionFilter("Sport et loisir")}
        >
          Sport et loisir
        </button>
        <button
          className="commission-button"
          onClick={() => handleCommissionFilter("Activité sociale")}
        >
          Activité sociale
        </button>
        <button
          className="commission-button"
          onClick={() => handleCommissionFilter("Scientifique")}
        >
          Scientifique
        </button>
        <button className="commission-button" onClick={handleClearFilter}>
          All
        </button>
      </div>
      <Membrepr membre={filteredMembers} />
    </>
  );
}

function Membrepr({ membre }) {
  return (
    <>
      <table className="demande-table">
        <thead>
          <tr>
            <th>#</th>
            <th>photo</th>
            <th>Nom</th>
            <th>Commission</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {membre.map((membre, index) => (
            <Membre membre={membre} index={index} key={index} />
          ))}
        </tbody>
      </table>
      <div style={{ height: "100px" }}></div>
    </>
  );
}

function Membre({ membre, index }) {
  const Delete = async () => {
    const doIt = window.confirm("Are you sure?");
    if (doIt) {
      const MembreRef = doc(db, "users", membre.uid);
      await deleteSubcollection(MembreRef, "posts");
      await deleteDoc(MembreRef);
      toast("Member deleted", { icon: "🗑️" });
    }
  };

  const deleteSubcollection = async (docRef, subcollectionName) => {
    const subcollectionRef = collection(docRef, subcollectionName);
    const querySnapshot = await getDocs(subcollectionRef);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  return (
    <>
      <tr>
        <td data-cell="#">{index + 1}</td>
        <td data-cell="picture">
          <img
            src={membre.photoURL}
            alt="photo profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </td>
        <td data-cell="Nom">{membre.username}</td>
        <td data-cell="Commission">{membre.commission}</td>
        <td data-cell="Action">
          {membre.username !== "badereddine" && (
            <button onClick={Delete} className="btn-red">
              Supprimer
            </button>
          )}
        </td>
      </tr>
    </>
  );
}
