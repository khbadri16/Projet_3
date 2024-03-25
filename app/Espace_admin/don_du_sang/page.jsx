"use client";
import Sidebar from "@/app/Styles/sidebarr";
import AdminCheck from "@/componenets/Admincheck";
import ShowParticipant from "@/components_3/Paricipant_du_Sang";
import Titre from "@/components_3/Title";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import React from "react";

export default function Page() {
  const userData = useUserdata();
  return (
    <>
      <UserContext.Provider value={userData}>
        <AdminCheck>
          <Sidebar />
          <ShowParticipant />
          <div style={{ height: "100px" }}></div>
        </AdminCheck>
      </UserContext.Provider>
    </>
  );
}
