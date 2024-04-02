"use client";
import Sidebar from "@/app/Styles/sidebarr";
import AdminCheck from "@/componenets/Admincheck";
import Titre from "@/components_3/Title";
import Part from "@/components_4/participant";
import PartA from "@/components_5/participantA";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import React from "react";

export default function Page() {
  const userData = useUserdata();
  return (
    <>
      <UserContext.Provider value={userData}>
        <AdminCheck>
          <Titre titre={"Liste des événements et de leurs participants"} />
          <Sidebar />
          <Part />
          <PartA />
          <div style={{ height: "100px" }}></div>
        </AdminCheck>
      </UserContext.Provider>
    </>
  );
}
