"use client";
import AdminCheck from "@/componenets/Admincheck";
import Separer from "@/components_3/Aline";
import Gestion_Demande from "@/components_3/Demandes";
import ShowParticipant from "@/components_3/Paricipant_du_Sang";
import Titre from "@/components_3/Title";
import React from "react";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import SignUpp from "@/components_3/Sign";

export default function Admin() {
  const userData = useUserdata();

  return (
    <>
      <UserContext.Provider value={userData}>
        <AdminCheck>
          <Titre titre={"Gestion du Demande de Réservation"} />
          <Gestion_Demande />
          <Separer />
          <Titre titre={"Liste des participant au don du sang"} />
          <ShowParticipant />
          <Separer />
          <Titre titre={"ajouter un Membre"} />
          <SignUpp />
        </AdminCheck>
      </UserContext.Provider>
    </>
  );
}
