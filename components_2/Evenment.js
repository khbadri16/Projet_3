"use client";
import { auth, db } from "@/app/firebase/config";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Terminer from "./Eventterminer";
import { doc, onSnapshot } from "firebase/firestore";

export default function Eventcontent({ events }) {
  return events
    ? events.map((event) => <EventC key={event.slug} event={event} />)
    : null;
}
export function EventC({ event }) {
  const [ifyes, setIfyes] = useState(event.time);
  let uid = null;
  if (auth.currentUser) {
    if (auth.currentUser.uid == "MQM0JYgIY4M5dMvLS6XHohqD6Ow2") {
      uid = true;
    }
  }

  const eventRef = doc(db, "Event", event.slug);

  useEffect(() => {
    const unsubscribe = onSnapshot(eventRef, (doc) => {
      if (doc.exists()) {
        setIfyes(doc.data().time);
      }
    });

    return () => unsubscribe();
  }, [eventRef]);
  const createdAt = new Date(event.createdAt.seconds * 1000);
  const formattedDate = createdAt.toLocaleString();
  return (
    <div className="card">
      <div className="container">
        <h3>
          <b>{event.title}</b>
        </h3>
        <h5>
          <span className="opacity">{formattedDate}</span>
        </h5>
      </div>

      <div className="container_3">
        <p>{event.category}</p>
        {ifyes ? (
          <h3 style={{ color: "green", fontWeight: "bold" }}>
            événement en cours
          </h3>
        ) : (
          <h3 style={{ color: "red", fontWeight: "bold" }}>ancien événement</h3>
        )}
        <div className="row">
          <div className="col-m8 col-s12">
            <p>
              <Link href={`/ShowEvent/${event.slug}/`}>
                <button className="buttone">
                  <b>SEE MORE »</b>
                </button>
              </Link>
            </p>
            {uid && (
              <>
                <Terminer event={event} />
                <Link href={`/Event/${event.slug}/`}>
                  <button className="btn-blue">
                    <b>Edit</b>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
