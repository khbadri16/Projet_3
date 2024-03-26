"use client";
import { auth } from "@/app/firebase/config";
import AdminCheck from "@/componenets/Admincheck";
import Deletacount from "@/components_4/deletacount";
import { UserContext } from "@/lib/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export default function Navbar2() {
  const [isClick, setisClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  const toggleNavbar = () => {
    setisClick(!isClick);
  };
  const userDropDown = user && (
    <div className="items-center relative">
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen3((prev) => !prev)}
          className="text-black hover:text-blue-500 text-lg bg-transparent ml-4"
        >
          {username}
          {isOpen3 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-4 h-4 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
        </button>
      </div>
      {isOpen3 && (
        <div className="bg-white absolute top-full left-0 mt-2 w-max">
          <a
            href={`/${username}/`}
            className="block px-4 py-2 hover:text-blue-500"
          >
            Profile
          </a>
          <button onClick={signOut} className="btn-badri">
            Sign out
          </button>
          <AdminCheck>
            <a
              href="/Espace_admin"
              className="block px-4 py-2 hover:text-blue-500"
            >
              Admin
            </a>
          </AdminCheck>
          <Deletacount />
        </div>
      )}
    </div>
  );

  const signInLink = !user && (
    <Link href="sign_in">
      <div className="flex items-center">
        <button className="text-black hover:text-blue-500 bg-transparent  text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          Log in
        </button>
      </div>
    </Link>
  );

  return (
    <nav className="bg-white fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex items-center">
            <div className="flex-shrink-0 space-x-2 flex items-center">
              <img
                src="/logo.png"
                href="/"
                className="h-10 md:h-10"
                alt="Logo"
              />
              <a href="/" className="text-black">
                CPF
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className=" flex items-center ">
              <a
                href="/Publication"
                className="text-black  hover:text-blue-500 text-lg ml-4"
              >
                Publication
              </a>
              <div className="items-center relative">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="text-black hover:text-blue-500 text-lg bg-transparent ml-4"
                  >
                    Activité
                    {isOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {isOpen && (
                  <div className="bg-white absolute top-full left-0 mt-2 w-full">
                    <a
                      href="/donne_sang"
                      className="block px-4 py-2 hover:text-blue-500"
                    >
                      Don du Sang
                    </a>
                    <a
                      href="/Maison_Eljiida"
                      className="block px-4 py-2 hover:text-blue-500"
                    >
                      Maison Eljiida
                    </a>
                    <a
                      href="/Medicament"
                      className="block px-4 py-2 hover:text-blue-500"
                    >
                      PharmDemande
                    </a>
                    <a href="/" className="block px-4 py-2 hover:text-blue-500">
                      Sensibilisation
                    </a>
                    <a href="/" className="block px-4 py-2 hover:text-blue-500">
                      Activités sociales
                    </a>
                    <a href="/" className="block px-4 py-2 hover:text-blue-500">
                      Accompagnements
                    </a>
                  </div>
                )}
              </div>
              <div className="items-center relative">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsOpen1((prev) => !prev)}
                    className="text-black hover:text-blue-500 text-lg bg-transparent ml-4"
                  >
                    Evénement
                    {isOpen1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {isOpen1 && (
                  <div className="bg-white absolute top-full left-0 mt-2 w-full">
                    <a
                      href="/ShowEvent/ShowEventc"
                      className="block px-4 py-2 hover:text-blue-500"
                    >
                      événement courant
                    </a>
                    <a
                      href="/ShowEvent"
                      className="block px-4 py-2 hover:text-blue-500"
                    >
                      dernier événement
                    </a>
                  </div>
                )}
              </div>
              <a
                href="/partner"
                className="text-black  hover:text-blue-500 text-lg ml-4 "
              >
                Partenaire
              </a>
              <div className="items-center relative">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsOpen2((prev) => !prev)}
                    className="text-black hover:text-blue-500 text-lg bg-transparent ml-4"
                  >
                    About
                    {isOpen2 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {isOpen2 && (
                  <div className="bg-white absolute top-full left-0 mt-2 w-full">
                    <a href="" className="block px-4 py-2 hover:text-blue-500">
                      Qui somme nous
                    </a>
                    <a href="" className="block px-4 py-2 hover:text-blue-500">
                      Comment nous rejoindre
                    </a>
                    <a href="" className="block px-4 py-2 hover:text-blue-500">
                      Comment pouvez-vous nous aider
                    </a>
                  </div>
                )}
              </div>
              {signInLink}
              {userDropDown}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <span
              style={{
                fontWeight: "bold",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              {isClick ? "Fermer" : "Menu"}
            </span>
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-black  hover:text-blue-500 focus:outline-none
           focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleNavbar}
            >
              {isClick ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isClick && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
            <a
              href="/Publication"
              className="text-black hover:text-blue-500 text-lg ml-4"
            >
              Publication
            </a>
            <div className="relative">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-black hover:text-blue-500 text-lg bg-transparent ml-4"
              >
                Activité
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                )}
              </button>
              {isOpen && (
                <div className="bg-white absolute mt-2 w-full z-10">
                  <a
                    href="/donne_sang"
                    className="block px-4 py-2 hover:text-blue-500"
                  >
                    Don du Sang
                  </a>
                  <a
                    href="/Maison_Eljiida"
                    className="block px-4 py-2 hover:text-blue-500"
                  >
                    Maison Eljiida
                  </a>
                  <a
                    href="/Medicament"
                    className="block px-4 py-2 hover:text-blue-500"
                  >
                    PharmDemande
                  </a>
                  <a href="" className="block px-4 py-2 hover:text-blue-500">
                    Sensibilisation
                  </a>
                  <a href="" className="block px-4 py-2 hover:text-blue-500">
                    Activités sociales
                  </a>
                  <a href="" className="block px-4 py-2 hover:text-blue-500">
                    Accompagnements
                  </a>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setIsOpen1((prev) => !prev)}
                className="text-black hover:text-blue-500 text-lg bg-transparent ml-4"
              >
                Evénement
                {isOpen1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                )}
              </button>
              {isOpen1 && (
                <div className="bg-white absolute mt-2 w-full z-10">
                  <a
                    href="/ShowEvent/ShowEventc"
                    className="block px-4 py-2 hover:text-blue-500"
                  >
                    événement courant
                  </a>
                  <a
                    href="/ShowEvent"
                    className="block px-4 py-2 hover:text-blue-500"
                  >
                    dernier événement
                  </a>
                </div>
              )}
            </div>
            <a
              href="/partner"
              className="text-black hover:text-blue-500 text-lg ml-4 "
            >
              Partenaire
            </a>
            <div className="relative">
              <button
                onClick={() => setIsOpen2((prev) => !prev)}
                className="text-black hover:text-blue-500 text-lg bg-transparent ml-4"
              >
                About
                {isOpen2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                )}
              </button>
              {isOpen2 && (
                <div className="bg-white absolute mt-2 w-full z-10">
                  <a href="" className="block px-4 py-2 hover:text-blue-500">
                    Qui somme nous
                  </a>
                  <a href="" className="block px-4 py-2 hover:text-blue-500">
                    Comment nous rejoindre
                  </a>
                  <a href="" className="block px-4 py-2 hover:text-blue-500">
                    Comment pouvez-vous nous aider
                  </a>
                </div>
              )}
            </div>
          </div>
          {signInLink}
          {userDropDown}
        </div>
      )}
    </nav>
  );
}
