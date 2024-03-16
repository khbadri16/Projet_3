import Link from "next/link";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const EventComponent = () => {
  return (
    <Link href="/Event">
      <div className="event-container">
        <div className="image-container">
          <FaCalendarAlt className="icon" />
        </div>
        <p className="text">Ajouter un Événement</p>
      </div>
    </Link>
  );
};

export default EventComponent;
