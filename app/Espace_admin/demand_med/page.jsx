"use client";
import Sidebar from "@/app/Styles/sidebarr";
import AdminCheck from "@/componenets/Admincheck";
import Separer from "@/components_3/Aline";
import Titre from "@/components_3/Title";
import Addmedicament from "@/components_4/addMed";
import ShowMedAdmin from "@/components_4/medAdmin";
import ShowdemanMed from "@/components_4/showdemand";
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
          <Titre titre={"Liste de damande des medicament"} />
          <ShowdemanMed />
          <Separer />
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "40px" }}>
              Stock de médicament et équipement
            </h2>
          </div>
          <ShowMedAdmin />
          <Separer />
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "40px" }}>Ajouter un medicament</h2>
          </div>
          <Addmedicament />
          <div style={{ height: "100px" }}></div>
        </AdminCheck>
      </UserContext.Provider>
    </>
  );
}
