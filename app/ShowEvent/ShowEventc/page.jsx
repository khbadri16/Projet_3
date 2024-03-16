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
import { db } from "@/app/firebase/config";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import AdminCheck from "@/componenets/Admincheck";
import Addbutton from "@/components_3/addButton";
import Navbar2 from "@/components_3/Navbar1.2";
import EventComponent from "@/components_4/addEvent";

export default function ShowEventc() {
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
