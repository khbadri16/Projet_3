import Maisonpr from "@/components_2/Maison";
import Maisonformulaire from "@/components_2/Maisonform";
import React from "react";

export default function page() {
  return (
    <>
      <Maisonpr />
      <div className="mb-8"></div>
      <Maisonformulaire />
    </>
  );
}
