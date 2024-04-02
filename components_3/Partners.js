"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "@/app/firebase/config";
import { collection, getDocs, limit, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Loading from "@/components_4/Loadin";

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
    return <Loading />;
  }
  return <Parslider partners={partners} />;
}

function Parslider({ partners }) {
  var settings = {
    dots: true,
    infinite: partners.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
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
            <Partnerr partner={partner} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function Partnerr({ partner }) {
  return (
    <div className="partner-slider">
      <div className="partner-container">
        <div className="partner-card">
          <img className="partner-image" src={partner.img} alt={partner.name} />
          <div className="partner-content">
            <h3 className="partner-title">{partner.name}</h3>
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
