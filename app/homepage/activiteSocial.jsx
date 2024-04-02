"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function ActiviteSociale() {
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
      title: "Les examens medicaux",
      image: "md.jpg",
      text: "Tous les examens qui sont temporairement ou definitivment inexistants au niveau de secteur public , aussi Achats de medicaments produits parapharmaceutiques, complement alimentaires ,Equipement medicaux et accessoires.",
    },
    {
      title: "Maison d'accueil",
      image: "jiida.jpg",
      link: "/Maison_Eljiida",
      text: " le prise en charge totale de 09 femmes des wilayas limitrophes,traitees par radiotherapie et hebergees a la maison d'accueil",
    },
    {
      title: "Aide financiere",
      image: "coff.jpg",
      text: "Divers prestations sont assurees au profit de nos patients atteints de cancers comme les frais de deplacement hors wilaya, les depenses pour des necessites absolues. Ramadhan : Couffin du ramadhan pour 150 familles, Aid el fitr : Tenues neuves aux enfants de patients atteints de cancers, Aid el adha: Achat des moutons pour les patients deminues , Rentree scolaire : Cartable,tablier et fournitures scolaires aux enfants des patients",
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
