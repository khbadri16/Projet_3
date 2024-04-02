import Terminer from "@/components_2/Eventterminer";
import { deleteDoc } from "firebase/firestore";
import Link from "next/link";
import React from "react";

export default function ListeEvent({ events }) {
  return (
    <>
      <table className="demande-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Categorie</th>
            <th>nombre de likes</th>
            <th>Etat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <Liste event={event} key={index} index={index} />
          ))}
        </tbody>
      </table>
      <div style={{ height: "100px" }}></div>
    </>
  );
}

function Liste({ event, index }) {
  const Delete = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      const EventRef = doc(db, "Event", event.slug);
      await deleteDoc(EventRef);
      toast("Evenment suprimer", { icon: "🗑️" });
    }
  };
  return (
    <>
      <tr>
        <td data-cell="#">{index + 1}</td>
        <td data-cell="Nom">{event.title}</td>
        <td data-cell="Categorie">{event.category}</td>
        <td data-cell="nombre de likes">{event.heartCount}</td>
        <td data-cell="Etat">
          <Terminer event={event} />
        </td>
        <td data-cell="Action" style={{ display: "flex", gap: "10px" }}>
          <button onClick={Delete} className="btn-red">
            Supprimer
          </button>
          <Link href={`/Event/${event.slug}/`} passHref>
            <button className="btn-blo">Modifier</button>
          </Link>
        </td>
      </tr>
    </>
  );
}
