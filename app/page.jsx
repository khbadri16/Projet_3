"use client";

import Navbar1 from "@/componenets/NavBar1.1";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";

export default function Page() {
  const userData = useUserdata();

  return (
    <UserContext.Provider value={userData}>
      <Navbar1 />
    </UserContext.Provider>
  );
}
