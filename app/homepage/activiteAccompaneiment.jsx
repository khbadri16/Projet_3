"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function Activiteacommpan() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const slidesData = [
    {
      title: "Groupe de paroles",
      image: "GP.jpg",
      text: "Des reunions periodiques regroupant des patients atteints de cancers et des anciens patients (gueris), en presence de psychologue pour un partage d'experiences",
    },
    {
      title: "Éducation thérapeutiques des patients",
      image: "ED.png",
      text: "  Un moyen qui permet aux patients atteints de cancers de mieux s'adapter a leurs situations",
    },
    {
      title: "Visites Domiciliaires et Hospitalières",
      image: "VS.JPG",
      text: " Visites des patients atteints de cancers a domicilie et aux structures hospitalieres",
    },
    {
      title: "Fetes et excursions",
      image: "RN.png",
      text: "Nous organisons des sorties, des randonnées et des cérémonies, gratuits pour les patients et avec une somme symbolique pour les participants. Tous les profits vont aux patients atteints de cancer.",
    },
    {
      title: "Don de sang et des plaquettes",
      image: "Ds.jpg",
      link: "/donne_sang",
      text: "Nous essayons de lutter contre toute pénurie de produit sanguin labile en encourageant et en facilitant la participation des donateurs à travers notre banque de sang en ligne et l'organisation de campagnes de don de sang.",
    },
  ];

  return (
    <div>
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <Sliderpres slide={slide} key={index} />
        ))}
      </Slider>
    </div>
  );
}

export function Sliderpres({ slide }) {
  return (
    <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between px-4">
      <div className="flex flex-col">
        <p className="font-bold text-lg mb-2">{slide.title}</p>
        <p className="slide-t text-lg text-center">{slide.text}</p>
        {slide.link && (
          <Link href={slide.link} className="text-blue-700 underline mt-2">
            See more
          </Link>
        )}
      </div>
      <img src={slide.image} alt="image" className="imageee" />
    </div>
  );
}
