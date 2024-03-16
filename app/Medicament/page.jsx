"use client";
import Navbar2 from "@/components_3/Navbar1.2";
import ShowMed from "@/components_4/med";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";

export default function Page() {
  const userData = useUserdata();
  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar2 />
      </UserContext.Provider>
      <ShowMed />
    </>
  );
}
