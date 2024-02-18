"use client";
import { db } from "@/app/firebase/config";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function Terminer({ event }) {
  const eventRef = doc(db, "Event", event.slug);
  const [isTimeActive, setIsTimeActive] = useState(event.time);

  useEffect(() => {
    const unsubscribe = onSnapshot(eventRef, (doc) => {
      if (doc.exists()) {
        setIsTimeActive(doc.data().time);
      }
    });

    return () => unsubscribe();
  }, [eventRef]);

  const toggleTime = async () => {
    try {
      await updateDoc(eventRef, { time: !isTimeActive });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <button className="event-button" onClick={toggleTime}>
        {isTimeActive ? "Terminer l'événement" : "Réactiver l'événement"}
      </button>
    </div>
  );
}
