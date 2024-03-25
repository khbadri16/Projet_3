"use client";
import Sidebar from "@/app/Styles/sidebarr";
import AdminCheck from "@/componenets/Admincheck";
import Addpartner from "@/components_3/Addpartner";
import Titre from "@/components_3/Title";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import React from "react";

export default function Page() {
  const userData = useUserdata();
  return (
    <>
      <UserContext.Provider value={userData}>
        <Sidebar />
        <Titre titre={"Ajouter un Partenair"} />
        <AdminCheck>
          <Addpartner />
          <div style={{ height: "100px" }}></div>
        </AdminCheck>
      </UserContext.Provider>
    </>
  );
}
