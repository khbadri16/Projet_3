"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  let ifyes = null;
  if (auth.currentUser) {
    if (auth.currentUser.uid == "MQM0JYgIY4M5dMvLS6XHohqD6Ow2") {
      ifyes = true;
    }
  }

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <div className="logo-and-button">
            <img src="/logo.png" className="logo-icon" />
            <Link href="/">
              <button className="btn-logo">CPF</button>
            </Link>
          </div>
        </li>

        {user && (
          <>
            {ifyes && (
              <li className="Event">
                <Link href="/Event">
                  <button className="btn-blue">Event</button>
                </Link>
              </li>
            )}

            <li className="push-left">
              <button onClick={signOut}>Sign Out</button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <h3>{username}</h3>
              </Link>
            </li>
          </>
        )}

        {!user && (
          <li>
            <Link href="/sign_in">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
