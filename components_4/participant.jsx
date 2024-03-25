"use client";
import Sidebar from "@/app/Styles/sidebarr";
import { db } from "@/app/firebase/config";
import Loading from "@/components_4/Loadin";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Part() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventsEnd, setEventsEnd] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventCollection = collection(db, "Event");
        const q = query(
          eventCollection,
          orderBy("createdAt", "desc"),
          where("time", "==", true)
        );
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

  return (
    <>
      <Eventadmin events={events} />
    </>
  );
}

export function Eventadmin({ events }) {
  return events
    ? events.map((event) => <EventA key={event.slug} event={event} />)
    : null;
}
export function EventA({ event }) {
  const [parts, setParts] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const eventRef = doc(db, "Event", event.slug);
        const participantsRef = collection(eventRef, "participant");
        const querySnapshot = await getDocs(participantsRef);

        if (!querySnapshot.empty) {
          const participantList = querySnapshot.docs.map((doc) => doc.data());
          console.log(
            "Fetched participants for event",
            event.slug,
            ":",
            participantList
          );
          setParts(participantList);
        } else {
          console.log(
            "No participants found for event",
            event.slug,
            "in Firestore."
          );
        }
      } catch (error) {
        console.error(
          "Error fetching participants for event",
          event.slug,
          ":",
          error
        );
      }
    };

    fetchParticipants();
  }, [event.slug]);

  const createdAt = new Date(event.createdAt.seconds * 1000);
  const formattedDate = createdAt.toLocaleString();
  return (
    <>
      <div className="event-head">
        Événement : {event.title} Le {formattedDate}
      </div>

      {parts ? (
        <>
          <table className="demande-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Téléphone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((part, index) => (
                <PartA
                  key={index}
                  participant={part}
                  index={index}
                  event={event}
                />
              ))}
            </tbody>
          </table>
          <div style={{ height: "100px" }}></div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <img src="/no-content.png" alt="No Participants found!" />
        </div>
      )}
    </>
  );
}

function PartA({ participant, index, event }) {
  const Delete = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      const PartdRef = doc(
        db,
        "Event",
        event.slug,
        "participant",
        participant.phoneNumber
      );
      await deleteDoc(PartdRef);
      toast("Participant suprimer", { icon: "🗑️" });
    }
  };
  return (
    <>
      <tr>
        <td data-cell="#">{index + 1}</td>
        <td data-cell="Nom">{participant.prenom}</td>
        <td data-cell="Telephone">{participant.nom}</td>
        <td data-cell="Produit">{participant.phoneNumber}</td>
        <td data-cell="Action">
          <button className="btn-red" onClick={Delete}>
            Supprimer
          </button>
        </td>
      </tr>
    </>
  );
}
