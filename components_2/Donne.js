"use client";
import Navbar2 from "@/components_3/Navbar1.2";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import React, { useEffect, useState } from "react";

export default function Donne() {
  const userData = useUserdata();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/pic.png", "/pic2.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar2 />
      </UserContext.Provider>
      <div className="container">
        <div className="flex items-center">
          <div className="image-cont">
            <img
              src={images[currentImageIndex]}
              alt="Image"
              className="image"
            />
          </div>
          <div className="text-container">
            <h1 className="title">Don du sang</h1>
            <p className="description">
              Le don de sang revêt une importance cruciale dans la lutte contre
              le cancer. Les traitements tels que la chimiothérapie et la
              radiothérapie, bien qu'essentiels, peuvent entraîner une
              diminution significative des cellules sanguines saines. Ainsi, le
              don de sang devient une ressource vitale pour restaurer ces
              composants essentiels et maintenir la santé des patients. Chaque
              donneur, par ce geste altruiste, contribue à fournir aux patients
              atteints de cancer la force nécessaire pour affronter les défis du
              traitement. Les transfusions sanguines ne représentent pas
              seulement une réponse médicale, mais aussi un acte de solidarité,
              créant un lien tangible entre donneurs et bénéficiaires. Les
              hématologues et les oncologues dépendent de ces contributions
              désintéressées pour soutenir les efforts de guérison. En tant que
              ressource inestimable, le sang donne un nouvel espoir aux
              patients, faisant de chaque donneur un véritable architecte de la
              vie et de la résilience face au cancer. Dans cette démarche
              collective, chaque goutte de sang offre la possibilité d'un avenir
              plus prometteur à ceux qui luttent courageusement contre cette
              maladie dévastatrice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
