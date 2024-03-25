import React from "react";

export default function Titre({ titre }) {
  return (
    <div className="kali">
      <h2 data-text={titre} className="hh2">
        {titre}
      </h2>
    </div>
  );
}
