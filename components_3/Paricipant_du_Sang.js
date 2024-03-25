"use client";
import { db } from "@/app/firebase/config";
import Loading from "@/components_4/Loadin";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Titre from "./Title";

export default function ShowParticipant() {
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    async function fetchParticipants() {
      try {
        const eventCollection = collection(db, "Sang");
        const q = query(eventCollection, limit(5));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const participantList = querySnapshot.docs.map((doc) => doc.data());
          console.log("Fetched Participants:", participantList);
          setParticipants(participantList);
        } else {
          console.log("No participants found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchParticipants();
  }, []);

  if (!participants) {
    return <Loading />;
  }
  return (
    <>
      <Titre titre={"Liste des Participant au Don du Sang"} />
      <Participantpr participants={participants} />
    </>
  );
}

function Participantpr({ participants }) {
  return (
    <>
      <table className="demande-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Téléphone 01</th>
            <th>Téléphone 02</th>
            <th>Type</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <Participant participant={participant} key={index} index={index} />
          ))}
        </tbody>
      </table>
      <div style={{ height: "100px" }}></div>
    </>
  );
}

function Participant({ participant, index }) {
  const Delete = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      const participantRef = doc(db, "Sang", participant.phone_1);
      await deleteDoc(participantRef);
      toast("Donateur suprimer", { icon: "🗑️" });
    }
  };

  return (
    <>
      <tr>
        <td data-cell="#">{index + 1}</td>
        <td data-cell="Nom">{participant.username}</td>
        <td data-cell="Telephone 01">{participant.phone_1}</td>
        <td data-cell="Telephone 02">{participant.phone_2}</td>
        <td data-cell="Type ">{participant.Type}</td>
        <td data-cell="Email">{participant.Email}</td>
        <td data-cell="Action ">
          <button onClick={Delete} className="btn-red">
            Supprimer
          </button>
        </td>
      </tr>
    </>
  );
}
