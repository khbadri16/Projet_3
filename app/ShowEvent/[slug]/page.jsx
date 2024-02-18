"use client";

import { db } from "@/app/firebase/config";
import Hearte from "@/components_2/Heartev";
import ParticiperEvent from "@/components_2/participer";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Eventshow({ params }) {
  const { slug } = params;
  return <Eventtext slug={slug} />;
}

function Eventtext({ slug }) {
  const [event, setEvent] = useState(null);
  const [eventRef, setEventRef] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const eventCollection = collection(db, "Event");
      const q = query(eventCollection, where("slug", "==", slug));

      try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const eventDoc = querySnapshot.docs[0];
          const eventData = eventDoc.data();
          setEvent(eventData);

          const documentReference = eventDoc.ref;
          setEventRef(documentReference);
        } else {
          console.log("No event found with the specified slug.");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [slug]);

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="event-container">
      <div className="event-header">
        <h1>{event.title}</h1>
        <p className="category">{event.category}</p>
      </div>
      <div className="event-content">
        <ReactMarkdown>{event?.content}</ReactMarkdown>
        <div className="event-details">
          <p className="event-amount"> Amount {event.prix} DA</p>
          <p className="event-sex">Sex: {event.sex}</p>
        </div>
      </div>
      <div className="event-actions">
        {event.time && <ParticiperEvent event={eventRef} />}
        <Hearte post={event} />
      </div>
    </div>
  );
}
