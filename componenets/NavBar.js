"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import { auth } from "@/app/firebase/config";
import AdminCheck from "./Admincheck";

export default function Navbar() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

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
            <AdminCheck>
              <>
                <li className="Event">
                  <Link href="/Event">
                    <button className="btn-blue">add Event</button>
                  </Link>
                </li>

                <li className="Event">
                  <Link href="/ShowEvent">
                    <button className="btn-blue">Events</button>
                  </Link>
                </li>

                <li className="Event">
                  <Link href="/Espace_admin">
                    <button className="btn-blue">Admin</button>
                  </Link>
                </li>
              </>
            </AdminCheck>

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
          <>
            <li>
              <Link href="/sign_in">
                <button className="btn-blue">Log in</button>
              </Link>
            </li>
            <li>
              <Link href="/donne_sang">
                <button className="btn-blue">Don du sang</button>
              </Link>
            </li>
          </>
        )}
        <li>
          <Link href="/Maison_Eljiida">
            <button className="btn-blue">Maison</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
