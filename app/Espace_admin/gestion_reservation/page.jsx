"use client";

import Sidebar from "@/app/Styles/sidebarr";
import AdminCheck from "@/componenets/Admincheck";
import Gestion_Demande from "@/components_3/Demandes";
import Titre from "@/components_3/Title";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";

export default function Page() {
  const userData = useUserdata();
  return (
    <>
      <UserContext.Provider value={userData}>
        <AdminCheck>
          <Sidebar />
          <Titre titre={"Gestion du Demande de Réservation"} />
          <Gestion_Demande />
          <div style={{ height: "100px" }}></div>
        </AdminCheck>
      </UserContext.Provider>
    </>
  );
}
