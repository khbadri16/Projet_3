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
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";
import AdminCheck from "@/componenets/Admincheck";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import Loading from "@/components_4/Loadin";
import getDescriptionWithStyling from "./getdesign";
import Link from "next/link";

export default function Sensibilisation() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const q = collection(db, "Event A");
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const eventsList = querySnapshot.docs.map((doc) => doc.data());
          console.log("Fetched Events:", eventsList);
          setEvents(eventsList);
        } else {
          console.log("No Events found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  if (!events) {
    return <Loading />;
  }
  return <Eventslider events={events} />;
}

function Eventslider({ events }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="med-slider">
      <Slider {...settings}>
        {events.map((event) => (
          <div key={event.id}>
            <Eventspr event={event} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function Eventspr({ event }) {
  const getEventNameColor = (eventName) => {
    switch (eventName) {
      case "Mars bleu":
        return "blue";
      case "Juin vert":
        return "green";
      case "Juillet noir":
        return "black";
      case "Septembre orange":
        return "orange";
      case "Octobre rose":
        return "deeppink";
      case "Novembre bleu-blanc":
        return "blue-white";
      default:
        return "black"; // default color
    }
  };

  const getEventNameWithStyledSpan = (eventName) => {
    const color = getEventNameColor(eventName);
    if (color === "blue-white") {
      const [blue, white] = eventName.split("-");
      return (
        <>
          <span style={{ color: "blue" }}>{blue}</span>
          <span
            style={{
              color: "white",
              textShadow: "0 0 10px grey", // Add text shadow for border effect
              padding: "0 2px",
            }}
          >
            {white}
          </span>
        </>
      );
    } else {
      return <span style={{ color }}>{eventName}</span>;
    }
  };

  const Delete = async () => {
    const doIt = confirm("are you sure!");
    if (doIt) {
      const PartnerRef = doc(db, "Event A", event.id);
      await deleteDoc(PartnerRef);
      toast("Partnaire suprimer", { icon: "🗑️" });
    }
  };

  return (
    <Link href={`/sensibilisation/${event.name}/`}>
      <div className="sensibilisation-slider">
        <div className="sensibilisation-container">
          <div className="sensibilisation-card">
            <img
              className="sensibilisation-image"
              src={event.picture}
              alt={event.name}
            />
            <div className="sensibilisation-content">
              <h3 className="sensibilisation-title">
                {getEventNameWithStyledSpan(event.name)}
              </h3>
              <p className="sensibilisation-description">
                {getDescriptionWithStyling(event.name, event.description)}
              </p>
              <div className="social-logos-container"></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
