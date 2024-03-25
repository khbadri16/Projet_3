"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar2 from "@/components_3/Navbar1.2";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import Slider from "react-slick";

export default function Page() {
  const userData = useUserdata();

  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar2 />
      </UserContext.Provider>
      <img src="coverture.JPG" alt="" style={{ filter: "grayscale(60%)" }} />

      <div
        style={{
          width: "100%",
          backgroundColor: "green",
          color: "white",
          padding: "20px",
        }}
      >
        <p>les événement de sensibilisation</p>
      </div>
      <SensibilisationSlider id="section1" />
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          color: "black",
          padding: "20px",
        }}
      >
        <p>les activité Sociale</p>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "black",
          color: "white",
          padding: "20px",
        }}
      >
        <p>les activité daccompagnement</p>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#ff1493",
          color: "white",
          padding: "20px",
        }}
      >
        <p>les partenaires</p>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#ff7f0e",
          color: "white",
          padding: "20px",
        }}
      >
        <p>la pharmacie</p>
      </div>
    </>
  );
}

function SensibilisationCard({ evenement }) {
  const className = evenement.replace(" ", "_");
  return (
    <div className={`sensibilisation-card ${className}`}>
      <h3 className="sensibilisation-title">{evenement}</h3>
    </div>
  );
}

function SensibilisationSlider() {
  const evenements = [
    "Mars bleu",
    "Juin vert",
    "Juillet noir",
    "Septembre orange",
    "Octobre rose",
    "Novembre bleu/blanc",
  ];
  // Configurations pour le slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    prevArrow: <button className="slick-prev">Previous</button>,
    nextArrow: <button className="slick-next">Next</button>,
  };

  return (
    <div className="sensibilisation-slider">
      <Slider {...settings}>
        {evenements.map((evenement, index) => (
          <div key={index} className="sensibilisation-container">
            <SensibilisationCard evenement={evenement} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
