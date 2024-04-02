"use client";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import Loading from "@/components_4/Loadin";
import Link from "next/link";

export default function ListeSensib() {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    async function fetchEvents() {
      try {
        const q = collection(db, "Event A");
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const eventList = querySnapshot.docs.map((doc) => doc.data());
          console.log("Fetched Events:", eventList);
          setEvents(eventList);
        } else {
          console.log("No events found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);
  if (!events) {
    return <Loading />;
  }
  return <ListeEvents events={events} />;
}

function ListeEvents({ events }) {
  return (
    <>
      <table className="demande-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Categorie</th>
            <th>nombre de likes</th>
            <th>Etat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <Listee event={event} key={index} index={index} />
          ))}
        </tbody>
      </table>
      <div style={{ height: "100px" }}></div>
    </>
  );
}

function Listee({ event, index }) {
  const Delete = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      const EventRef = doc(db, "Event", event.id);
      await deleteDoc(EventRef);
      toast("Evenment suprimer", { icon: "🗑️" });
    }
  };
  return (
    <>
      <tr>
        <td data-cell="#">{index + 1}</td>
        <td data-cell="Nom">{event.title}</td>
        <td data-cell="Categorie">{event.category}</td>
        <td data-cell="nombre de likes">{event.heartCount}</td>
        <td data-cell="Etat">
          <Terminers event={event} />
        </td>
        <td data-cell="Action" style={{ display: "flex", gap: "10px" }}>
          <button onClick={Delete} className="btn-red">
            Supprimer
          </button>
          <Link href={`/Event/${event.slug}/`} passHref>
            <button className="btn-blo">Modifier</button>
          </Link>
        </td>
      </tr>
    </>
  );
}

function Terminers({ event }) {
  const eventRef = doc(db, "Event A", event.id);
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
      <button
        className="event-button"
        onClick={toggleTime}
        style={{
          backgroundColor: isTimeActive ? "green" : "red",
          color: "white",
        }}
      >
        {isTimeActive ? "En cours" : "Terminé"}
      </button>
    </div>
  );
}
