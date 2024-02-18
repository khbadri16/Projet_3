"use client";
import Eventcontent from "@/components_2/Evenment";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, postToJSON } from "../firebase/config";
import Loader from "@/componenets/loader";

export default function ShowEvent() {
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
          limit(5)
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

  return <Eventcontent events={events} />;
}
