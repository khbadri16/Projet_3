"use client";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ListeEvent from "@/components_5/listeEvent";
import { db } from "@/app/firebase/config";
import Loading from "@/components_4/Loadin";
import ListeSensib from "@/components_5/listeSensib";
import Titre from "@/components_3/Title";
import { UserContext } from "@/lib/context";
import AdminCheck from "@/componenets/Admincheck";
import Sidebar from "@/app/Styles/sidebarr";
import useUserdata from "@/lib/hooks";
import EventComponent from "@/components_4/addEvent";

export default function Page() {
  const userData = useUserdata();
  const [events, setEvents] = useState(null);
  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventCollection = collection(db, "Event");
        const q = query(eventCollection, orderBy("createdAt", "desc"));
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
      <UserContext.Provider value={userData}>
        <AdminCheck>
          <Sidebar />
          <Titre titre={"Liste des événement"} />
          <EventComponent />
          <div style={{ height: "30px" }}></div>
          <ListeEvent events={events} />;
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "40px" }}>
              Liste des événement du sensibilisation
            </h2>
          </div>
          <ListeSensib />
        </AdminCheck>
      </UserContext.Provider>
    </>
  );
}
