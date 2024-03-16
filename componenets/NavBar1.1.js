"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useContext } from "react";
import { auth } from "@/app/firebase/config";
import { UserContext } from "@/lib/context";
import { useRouter } from "next/navigation";
import AdminCheck from "./Admincheck";

export default function Navbar1() {
  const [navbar, setNavbar] = useState(false);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [activityDropdownOpen, setActivityDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const eventDropdownRef = useRef(null);
  const activityDropdownRef = useRef(null);
  const userDropdownOpenRef = useRef(null);
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  const handleNavbarClick = () => {
    setNavbar(!navbar);
    setEventDropdownOpen(false);
    setActivityDropdownOpen(false);
  };

  const handleEventDropdownClick = () => {
    setEventDropdownOpen(!eventDropdownOpen);
    setActivityDropdownOpen(false);
  };

  const handleActivityDropdownClick = () => {
    setActivityDropdownOpen(!activityDropdownOpen);
    setEventDropdownOpen(false);
  };

  const handleUserDropdownClick = () => {
    setUserDropdownOpen(!userDropdownOpen);
    setEventDropdownOpen(false);
    setActivityDropdownOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (
      eventDropdownRef.current &&
      !eventDropdownRef.current.contains(e.target)
    ) {
      setEventDropdownOpen(false);
    }
    if (
      activityDropdownRef.current &&
      !activityDropdownRef.current.contains(e.target)
    ) {
      setActivityDropdownOpen(false);
    }
    if (
      userDropdownOpenRef.current &&
      !userDropdownOpenRef.current.contains(e.target)
    ) {
      setUserDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const userDropdown = user && (
    <li
      className="relative group"
      ref={userDropdownOpenRef}
      style={{ position: "relative" }}
    >
      <div
        className={`pb-6 text-xl text-black py-2 px-6 text-center border-b-2 md:border-b-0 hover:bg-blue-600 border-blue-900 md:hover:text-blue-600 md:hover:bg-transparent cursor-pointer`}
        onClick={handleUserDropdownClick}
        style={{ cursor: "pointer" }}
      >
        {username}
      </div>
      <ul
        className={`absolute left-0 mt-2 space-y-2 bg-white border border-gray-300 text-black ${
          userDropdownOpen ? "block" : "hidden"
        }`}
        style={{ top: "100%", position: "absolute", left: 0 }}
      >
        <li className="py-2 px-4 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white text-center">
          <Link
            href={`/${username}`}
            className="block"
            onClick={handleNavbarClick}
          >
            Profile
          </Link>
        </li>
        <li className="py-2 px-4 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white text-center">
          <Link href="/" className="block" onClick={signOut}>
            Signout
          </Link>
        </li>
        <AdminCheck>
          <li className="py-2 px-4 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white text-center">
            <Link
              href="/Espace_admin"
              className="block"
              onClick={handleNavbarClick}
            >
              Admin
            </Link>
          </li>
        </AdminCheck>
      </ul>
    </li>
  );

  const signInLink = !user && (
    <li
      className={`pb-6 text-xl text-black py-2 px-6 text-center border-b-2 md:border-b-0 hover:bg-blue-600 border-blue-900 md:hover:text-blue-600 md:hover:bg-transparent`}
    >
      <Link href="/sign_in" onClick={() => setNavbar(!navbar)}>
        Sign in
      </Link>
    </li>
  );

  return (
    <div>
      <nav className="w-full bg-white fixed top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <Link href="/">
                <div className="flex items-center">
                  <img src="/logo.png" className="h-10 md:h-10" alt="Logo" />
                  {/* TITLE */}
                  <h2 className="text-2xl md:text-xl text-black font-bold ml-4">
                    CPF
                  </h2>
                </div>
              </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={handleNavbarClick}
                >
                  {navbar ? (
                    <Image src="/close.svg" width={30} height={30} alt="logo" />
                  ) : (
                    <Image
                      src="/menu.svg"
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-12 md:p-0 block" : "hidden"
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex">
                <li
                  className={`pb-6 text-xl text-black py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:bg-blue-600 border-blue-900 md:hover:text-blue-600 md:hover:bg-transparent`}
                >
                  <Link href="/Publication" onClick={() => setNavbar(!navbar)}>
                    Publication
                  </Link>
                </li>

                <li
                  className="relative group"
                  ref={activityDropdownRef}
                  style={{ position: "relative" }}
                >
                  <div
                    className={`pb-6 text-xl text-black py-2 px-6 text-center border-b-2 md:border-b-0 hover:bg-blue-600 border-blue-900 md:hover:text-blue-600 md:hover:bg-transparent cursor-pointer`}
                    onClick={handleActivityDropdownClick}
                    style={{ cursor: "pointer" }}
                  >
                    Nos activité
                  </div>
                  <ul
                    className={`absolute left-0 mt-2 space-y-2 bg-white border border-gray-300 text-black ${
                      activityDropdownOpen ? "block" : "hidden"
                    }`}
                    style={{ top: "100%", position: "absolute", left: 0 }}
                  >
                    <li className="py-2 px-4 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white text-center">
                      <Link
                        href="/donne_sang"
                        className="block"
                        onClick={handleNavbarClick}
                      >
                        Don du sang
                      </Link>
                    </li>

                    <li className="py-2 px-4 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white text-center">
                      <Link
                        href="/Maison_Eljiida"
                        className="block"
                        onClick={handleNavbarClick}
                      >
                        Maison Eljiida
                      </Link>
                    </li>
                    <li className="py-2 px-4 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white text-center">
                      <Link
                        href="/Medicament"
                        className="block"
                        onClick={handleNavbarClick}
                      >
                        PharmDemande
                      </Link>
                    </li>
                  </ul>
                </li>

                <li
                  className={`pb-6 text-xl text-black py-2 px-6 text-center border-b-2 md:border-b-0 hover:bg-blue-600 border-blue-900 md:hover:text-blue-600 md:hover:bg-transparent`}
                >
                  <Link href="#contact" onClick={() => setNavbar(!navbar)}>
                    Qui somme nous
                  </Link>
                </li>
                <li
                  className={`pb-6 text-xl text-black py-2 px-6 text-center border-b-2 md:border-b-0 hover:bg-blue-600 border-blue-900 md:hover:text-blue-600 md:hover:bg-transparent`}
                >
                  <Link href="/partner" onClick={() => setNavbar(!navbar)}>
                    Nos partenaires
                  </Link>
                </li>
                <li
                  className="relative group"
                  ref={eventDropdownRef}
                  style={{ position: "relative" }}
                >
                  <div
                    className={`pb-6 text-xl text-black py-2 px-6 text-center border-b-2 md:border-b-0 hover:bg-blue-600 border-blue-900 md:hover:text-blue-600 md:hover:bg-transparent cursor-pointer`}
                    onClick={handleEventDropdownClick}
                    style={{ cursor: "pointer" }}
                  >
                    Événement
                  </div>
                  <ul
                    className={`absolute left-0 mt-2 space-y-2 bg-white border border-gray-300 text-black ${
                      eventDropdownOpen ? "block" : "hidden"
                    }`}
                    style={{ top: "100%", position: "absolute", left: 0 }}
                  >
                    <li className="py-2 px-4 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white text-center">
                      <Link
                        href="/ShowEvent/ShowEventc"
                        className="block"
                        onClick={handleNavbarClick}
                      >
                        Événement currant
                      </Link>
                    </li>
                    <li className="py-2 px-4 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white text-center">
                      <Link
                        href="/ShowEvent"
                        className="block"
                        onClick={handleNavbarClick}
                      >
                        Nos Dernier Événements
                      </Link>
                    </li>
                  </ul>
                </li>
                {userDropdown}
                {signInLink}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
