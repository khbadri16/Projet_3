"use client";
import React, { useEffect, useState } from "react";

export default function Maisonpr() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/pic3.jpg", "/pic4.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="flex items-center">
        <div className="image-container">
          <img src={images[currentImageIndex]} alt="Image" className="image" />
        </div>
        <div className="text-container">
          <h1 style={{ color: "green", fontWeight: "bold" }}>
            Maison EL jiida
          </h1>
          <p className="description">
            In the vast expanse of the cosmos, where stars twinkle like distant
            promises, and galaxies weave tales of cosmic wonder, we find
            ourselves on a journey through the boundless universe. Each speck of
            stardust carries the echoes of an untold story, and as we traverse
            the cosmic tapestry, we become both explorers and dreamers.As we
            drift through the cosmic symphony, the ethereal hum of nebulae and
            the gentle pulsing of distant quasars serenade us. It's a cosmic
            ballet where planets waltz around their celestial partners, and
            comets leave shimmering trails, marking their fleeting presence in
            the cosmic dance.
          </p>
        </div>
      </div>
    </div>
  );
}
