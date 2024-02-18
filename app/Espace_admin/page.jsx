import Separer from "@/components_3/Aline";
import Gestion_Demande from "@/components_3/Demandes";
import ShowParticipant from "@/components_3/Paricipant_du_Sang";
import Titre from "@/components_3/Title";
import React from "react";

export default function page() {
  return (
    <>
      <Titre titre={"Gestion du Demande de Réservation"} />
      <Gestion_Demande />
      <Separer />
      <Titre titre={"Liste des participant au don du sang"} />
      <ShowParticipant />
      <Separer />
    </>
  );
}
