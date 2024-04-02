"use client";
import { useState, useEffect } from "react";
import { FcSearch } from "react-icons/fc";
import { collection, getDocs, query, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import toast from "react-hot-toast";
import Loading from "@/components_4/Loadin";

export default function ShowPartAdm() {
  const [partners, setPartners] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchPart() {
      try {
        const Collection = collection(db, "Partner");
        const q = query(Collection);
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const PartList = querySnapshot.docs.map((doc) => doc.data());
          console.log("Fetched Partners:", PartList);
          setPartners(PartList);
        } else {
          console.log("No partners found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchPart();
  }, []);

  if (!partners) {
    return <Loading />;
  }

  const filteredPartners = partners.filter((part) =>
    part.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="parent-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher un partenaire"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
          <FcSearch className="search-icon" />
        </div>
      </div>
      <Partadmin partners={filteredPartners} />
    </>
  );
}

export function Partadmin({ partners }) {
  return (
    <>
      <table className="demande-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Nom</th>
            <th>description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((part, index) => (
            <Partnerpre part={part} index={index} />
          ))}
        </tbody>
      </table>
      <div style={{ height: "100px" }}></div>
    </>
  );
}

function Partnerpre({ part, index }) {
  const Delete = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      const medRef = doc(db, "Partner", part.name);
      await deleteDoc(medRef);
      toast("Partenaire suprimer", { icon: "🗑️" });
    }
  };
  return (
    <>
      <tr>
        <td data-cell="#">{index + 1}</td>
        <td data-cell="Image">
          <img
            src={part.img}
            alt="image"
            style={{ width: "50px", height: "auto" }}
          />
        </td>
        <td data-cell="Nom">{part.name}</td>
        <td data-cell="descreption">
          <div style={{ width: "350px", height: "auto" }}>
            {part.descreption}
          </div>
        </td>
        <td data-cell="Action">
          <button onClick={Delete} className="btn-red">
            Supprimer
          </button>
        </td>
      </tr>
    </>
  );
}
