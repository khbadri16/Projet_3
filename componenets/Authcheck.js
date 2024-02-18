import { UserContext } from "@/lib/context";
import Link from "next/link";
import { useContext } from "react";
import Loader from "./loader";

export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  if (username === "loading") {
    return <Loader show={true} />;
  }
  return username ? props.children : props.fallback;
}
