import { UserContext } from "@/lib/context";
import { useContext } from "react";
import Loader from "./loader";

export default function AdminCheck(props) {
  const { username } = useContext(UserContext);

  if (username === "loading") {
    return <Loader show={true} />;
  }
  if (username == "badereddine") {
    return props.children;
  } else {
    return props.fallback;
  }
}
