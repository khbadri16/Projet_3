"use client";
import { db } from "@/app/firebase/config";
import Hearte from "@/components_2/Heartev";
import ParticiperEvent from "@/components_2/participer";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Page({ params }) {
  const [event, setEvent] = useState(null);
  const [eventRef, setEventRef] = useState(null);
  const { name } = params;
  const decodedName = decodeURIComponent(name);

  useEffect(() => {
    const fetchData = async () => {
      const eventCollection = collection(db, "Event A");
      const q = query(eventCollection, where("name", "==", decodedName));
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
  }, [name]);

  if (!event) {
    return;
  }

  return <EventCont post={event} eventRef={eventRef} />;
}

function EventCont({ post, eventRef }) {
  return (
    <>
      <div className="cardd">
        <h1>{post.name}</h1>
        <p>{post.description}</p>
        <ReactMarkdown>{post?.content}</ReactMarkdown>
      </div>
      <div className="event-actions">
        {post.time && <ParticiperEvent event={eventRef} />}
        <Hearte post={post} />
      </div>
    </>
  );
}
