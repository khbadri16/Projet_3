"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar2 from "@/components_3/Navbar1.2";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import Slider from "react-slick";
import Sensibilisation from "@/components_5/sensibilisation";
import CoverWithText from "./homepage/cover";
import ShowPartner from "@/components_3/Partners";
import ShowMed from "@/components_4/med";
import ActiviteSociale from "./homepage/activiteSocial";
import Activiteacommpan from "./homepage/activiteAccompaneiment";

export default function Page() {
  const userData = useUserdata();

  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar2 />
      </UserContext.Provider>
      <CoverWithText />

      <div className="flex flex-col items-center mt-5 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-white mb-2">
          Sensibilisation
        </h1>
        <div style={{ height: "30px" }}></div>
        <small className="text-base md:text-lg lg:text-xl font-semibold text-gray-500 dark:text-gray-400">
          Nous organisons chaque annee des compagnes de prevention et de
          sensibilisation en vue de diagnostiquer les cancers a leurs premiers
          stades et d en prevenir leur appartion...La lutte contre le cancer
          commence par la sensibilisation. Comprendre cette maladie, ses causes,
          ses traitements et les moyens de prévention est essentiel pour réduire
          son impact sur nos vies. C’est pourquoi nous invitons chaque visiteur
          de notre application à participer activement à nos événements de
          sensibilisation. En vous joignant à nous, vous contribuez à éclairer
          les esprits, à partager des histoires inspirantes et à diffuser des
          informations vitales qui peuvent sauver des vies. Chaque action
          compte. Votre engagement fait une différence. Ensemble, nous pouvons
          construire une communauté informée et résiliente, prête à affronter le
          cancer avec courage et espoir. Participez à nos événements de
          sensibilisation et aidez-nous à transformer la sensibilisation en
          action.
        </small>
      </div>
      <div style={{ height: "100px" }}></div>
      <Sensibilisation />
      <div style={{ height: "100px" }}></div>
      <div className="flex flex-col items-center mt-5 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-white mb-2">
          Activités sociales
        </h1>
        <div style={{ height: "30px" }}></div>
        <small className="text-base md:text-lg lg:text-xl font-semibold text-gray-500 dark:text-gray-400">
          Nos activité sociale
        </small>
      </div>
      <div style={{ height: "100px" }}></div>
      <ActiviteSociale />
      <div className="flex flex-col items-center mt-5 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-white mb-2">
          Activités d accompaneiment
        </h1>
        <div style={{ height: "30px" }}></div>
        <small className="text-base md:text-lg lg:text-xl font-semibold text-gray-500 dark:text-gray-400">
          Nos activités d accompaneiment
        </small>
      </div>
      <div style={{ height: "100px" }}></div>
      <Activiteacommpan />
      <div className="flex flex-col items-center mt-5 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-white mb-2">
          Nos Partenaires
        </h1>
        <div style={{ height: "30px" }}></div>
        <small className="text-base md:text-lg lg:text-xl font-semibold text-gray-500 dark:text-gray-400">
          Dans le combat acharné contre le cancer, chaque geste de soutien
          compte. Nos partenaires sont le pilier de nos efforts, apportant non
          seulement un soutien financier indispensable, mais aussi une expertise
          et une visibilité cruciales. Grâce à leur engagement, nous pouvons
          continuer à financer la recherche innovante, soutenir les patients et
          leurs familles, et sensibiliser le public à cette cause vitale. En
          vous associant à notre mission, vous ne contribuez pas seulement à une
          noble cause, vous devenez également partie intégrante d’une communauté
          déterminée à faire une différence. Ensemble, nous pouvons briser les
          barrières, et offrir de l’espoir à des milliers de personnes touchées
          par cette maladie.
          <a className="underline text-blue-500 hover:text-blue-600" href="#">
            Rejoignez-nous
          </a>
          ,et devenez un partenaire dans notre lutte pour éradiquer le cancer.
          Votre soutien est notre force.
        </small>
      </div>
      <div style={{ height: "100px" }}></div>
      <ShowPartner />
      <div style={{ height: "100px" }}></div>
      <div className="flex flex-col items-center mt-5 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-white mb-2">
          Notre pharmacie
        </h1>
        <div style={{ height: "30px" }}></div>
        <small className="text-base md:text-lg lg:text-xl font-semibold text-gray-500 dark:text-gray-400">
          Nous comprenons les défis auxquels sont confrontés les patients
          atteints de cancer et leurs familles. C’est pourquoi notre pharmacie
          en ligne est dédiée à fournir un accès facile et rapide à une large
          gamme de médicaments et d’équipements essentiels pour les soins du
          cancer.
        </small>
      </div>
      <div style={{ height: "100px" }}></div>
      <ShowMed />
    </>
  );
}
