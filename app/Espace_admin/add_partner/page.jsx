"use client";
import Sidebar from "@/app/Styles/sidebarr";
import AdminCheck from "@/componenets/Admincheck";
import Addpartner from "@/components_3/Addpartner";
import Separer from "@/components_3/Aline";
import Titre from "@/components_3/Title";
import ShowPartAdm from "@/components_5/showpart";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import React from "react";

export default function Page() {
  const userData = useUserdata();
  return (
    <>
      <UserContext.Provider value={userData}>
        <Sidebar />
        <Titre titre={"Liste des partenaires"} />
        <ShowPartAdm />
        <Separer />
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "40px" }}>Ajouter un partenaire</h2>
        </div>
        <AdminCheck>
          <Addpartner />
          <div style={{ height: "100px" }}></div>
        </AdminCheck>
      </UserContext.Provider>
    </>
  );
}
