"use client";
import Eventcontent from "@/components_2/Evenment";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, postToJSON } from "../firebase/config";
import Addbutton from "@/components_3/addButton";
import useUserdata from "@/lib/hooks";
import { UserContext } from "@/lib/context";
import AdminCheck from "@/componenets/Admincheck";
import Navbar2 from "@/components_3/Navbar1.2";
import EventComponent from "@/components_4/addEvent";

export default function ShowEvent() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventsEnd, setEventsEnd] = useState(false);
  const userData = useUserdata();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventCollection = collection(db, "Event");
        const q = query(
          eventCollection,
          orderBy("createdAt", "desc"),
          limit(5),
          where("time", "==", false)
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

  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar2 />
        <AdminCheck>
          <EventComponent />
        </AdminCheck>
      </UserContext.Provider>
      <Eventcontent events={events} />
    </>
  );
}
