"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "@/app/firebase/config";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";
import Loading from "./Loadin";

export default function ShowMed() {
  const [medicaments, setMedicaments] = useState(null);

  useEffect(() => {
    async function fetchMed() {
      try {
        const Collection = collection(db, "Med");
        const q = query(Collection, limit(5));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const MedList = querySnapshot.docs.map((doc) => doc.data());
          console.log("Fetched Med:", MedList);
          setMedicaments(MedList);
        } else {
          console.log("No partners found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchMed();
  }, []);

  if (!medicaments) {
    return <Loading />;
  }
  return <MedSlider medicaments={medicaments} />;
}

function MedSlider({ medicaments }) {
  var settings = {
    dots: true,
    infinite: medicaments.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    prevArrow: <button className="slick-prev">Previous</button>,
    nextArrow: <button className="slick-next">Next</button>,
  };

  return (
    <div className="med-slider">
      <Slider {...settings}>
        {medicaments.map((medicament) => (
          <div key={medicament.name} className="med-container">
            <Med medicament={medicament} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function Med({ medicament }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleDemand = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const MedRef = doc(db, "Med", medicament.name);
    const ref = doc(collection(MedRef, "demandes"), name);

    const data = {
      name: name,
      phone: phone,
      createdAt: serverTimestamp(),
      Produit: medicament.name,
    };

    await setDoc(ref, data);
    alert(`Name: ${name}, Phone: ${phone}`);
    setName("");
    setPhone("");
    setIsFormVisible(false);
    toast.success(
      "Votre demande a été prise en compte. Nous allons vous contacter bientôt !"
    );
  };

  return (
    <div className="medicament-card">
      <img
        className="medicament-image"
        src={medicament.img}
        alt={medicament.name}
      />
      <div className="medicament-content">
        <h3 className="partner-title">{medicament.name}</h3>
        <p className="medicament-description">{medicament.descreption}</p>
        <div className="medicament-counter">
          <span className="product-count">
            nombre de produit : {medicament.nb}
          </span>
        </div>
        <button className="demand-button" onClick={handleDemand}>
          Demand
        </button>
        {isFormVisible && (
          <div className="popup-form-container">
            <div className="popup-form">
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
