import React from "react";

export default function Titre({ titre }) {
  return (
    <h1
      style={{
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
        border: "1px solid black",
        padding: "10px",
      }}
    >
      {titre}
    </h1>
  );
}
