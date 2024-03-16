"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "@/app/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";
import AdminCheck from "@/componenets/Admincheck";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";

export default function ShowPartner() {
  const [partners, setPartners] = useState(null);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const Collection = collection(db, "Partner");
        const q = query(Collection, limit(5));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const partnersList = querySnapshot.docs.map((doc) => doc.data());
          console.log("Fetched Partner:", partnersList);
          setPartners(partnersList);
        } else {
          console.log("No partners found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchPartners();
  }, []);

  if (!partners) {
    return <h5>Loading...</h5>;
  }
  return <Parslider partners={partners} />;
}

function Parslider({ partners }) {
  const userData = useUserdata();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show only one slide at a time
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0", // No padding at the sides
    prevArrow: (
      <button className="slick-prev" style={{ color: "black" }}>
        Previous
      </button>
    ),
    nextArrow: (
      <button className="slick-next" style={{ color: "black" }}>
        Next
      </button>
    ),
  };

  return (
    <div className="med-slider">
      <Slider {...settings}>
        {partners.map((partner) => (
          <div key={partner.name}>
            <UserContext.Provider value={userData}>
              <Partnerr partner={partner} />
            </UserContext.Provider>
          </div>
        ))}
      </Slider>
    </div>
  );
}

function Partnerr({ partner }) {
  const Delete = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      const PartnerRef = doc(db, "Partner", partner.name);
      await deleteDoc(PartnerRef);
      toast("Partnaire suprimer", { icon: "🗑️" });
    }
  };

  return (
    <div className="partner-slider">
      <div className="partner-container">
        <div className="partner-card">
          <img className="partner-image" src={partner.img} alt={partner.name} />
          <div className="partner-content">
            <h3 className="partner-title">
              {partner.name}
              <AdminCheck>
                <span className="admin-check" onClick={Delete}>
                  <img src="/delte.svg" alt="Delete" className="delete-icon" />
                </span>
              </AdminCheck>
            </h3>
            <p className="partner-description">{partner.descreption}</p>
            <div className="social-logos-container">
              {partner.Facebook && (
                <a href={partner.Facebook}>
                  <img
                    src="/facebook.svg"
                    alt="Facebook Logo"
                    className="social-logo"
                  />
                </a>
              )}
              {partner.Youtube && (
                <a href={partner.Youtube}>
                  <img
                    src="/Youtube.svg"
                    alt="YouTube Logo"
                    className="social-logo"
                  />
                </a>
              )}
              {partner.Instagram && (
                <a href={partner.Instagram}>
                  <img
                    src="/instagram.svg"
                    alt="Instagram Logo"
                    className="social-logo"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
