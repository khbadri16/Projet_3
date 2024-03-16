"use client";

import { db } from "@/app/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    return <h5>Loading...</h5>;
  }
  return <Participantpr participants={participants} />;
}

function Participantpr({ participants }) {
  return participants
    ? participants.map((participant) => (
        <Participant participant={participant} key={participant.id} />
      ))
    : null;
}

function Participant({ participant }) {
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
      <div className="cardd">
        <strong>{participant.username}</strong>
        <h2>{participant.phone_1}</h2>
        <h2>{participant.phone_2}</h2>
        <h2>{participant.Type}</h2>
        <h2>{participant.Email}</h2>
        <button onClick={Delete} className="btn-red">
          Supprimer
        </button>
      </div>
    </>
  );
}
