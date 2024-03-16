"use client";
import Navbar2 from "@/components_3/Navbar1.2";
import ShowPartner from "@/components_3/Partners";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";

export default function Page() {
  const userData = useUserdata();
  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar2 />
      </UserContext.Provider>
      <ShowPartner />
    </>
  );
}
