import { UserContext } from "@/lib/context";
import { useContext } from "react";

export default function AdminCheck(props) {
  const { username } = useContext(UserContext);

  if (username === "loading") {
    return <div>Loading ...</div>;
  }
  if (username == "badereddine") {
    return props.children;
  } else {
    return props.fallback;
  }
}
