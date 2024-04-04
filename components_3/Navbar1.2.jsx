"use client";
import { auth } from "@/app/firebase/config";
import AdminCheck from "@/componenets/Admincheck";
import Deletacount from "@/components_4/deletacount";
import { UserContext } from "@/lib/context";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { VscListSelection } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

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
        <a
          onClick={(e) => {
            e.preventDefault();
            setIsOpen3((prev) => !prev);
          }}
          className="text-black hover:text-blue-500 text-lg bg-transparent ml-4 flex items-center"
        >
          {username}
          {isOpen3 ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />}
        </a>
      </div>
      {isOpen3 && (
        <div className="bg-white absolute top-full left-0 mt-2 w-auto min-w-full rounded-md shadow-md font-bold anianim ">
          <a
            href={`/${username}/`}
            className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
          >
            Profile
          </a>
          <AdminCheck>
            <a
              href="/Espace_admin"
              className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
            >
              Admin
            </a>
          </AdminCheck>
          <a
            href="/Espace_admin"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
            className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
          >
            Sign out
          </a>

          <Deletacount />
        </div>
      )}
    </div>
  );

  const signInLink = !user && (
    <div className="flex items-center">
      <a
        href="/sign_in"
        className="text-black hover:text-blue-500 text-lg bg-transparent ml-6 flex items-center font-bold "
      >
        <FaUser style={{ marginRight: "5px" }} />
        Log in
      </a>
    </div>
  );

  return (
    <nav className="bg-white fixed top-0 w-full z-10 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full space-x-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 space-x-2 flex items-center">
              <img
                src="/logo.png"
                href="/"
                className="h-10 md:h-10"
                alt="Logo"
              />
              <a href="/" className="text-black font-bold text-lg">
                CPF
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className=" flex items-center ">
              <a
                href="/Publication"
                className="text-black  hover:text-blue-500 text-lg  "
              >
                Publication
              </a>
              <div className="items-center relative">
                <div className="flex items-center">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen((prev) => !prev);
                    }}
                    className="text-black hover:text-blue-500 text-lg ml-6 flex items-center font-bold unselectable"
                  >
                    Activité
                    {isOpen ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />}
                  </a>
                </div>
                {isOpen && (
                  <div className="bg-white absolute top-full left-0 mt-2 w-auto min-w-full rounded-md shadow-md anianim">
                    <a
                      href="/donne_sang"
                      className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                    >
                      Don du Sang
                    </a>
                    <a
                      href="/Maison_Eljiida"
                      className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                    >
                      Maison Eljiida
                    </a>
                    <a
                      href="#med"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen((prev) => !prev);
                      }}
                      className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                    >
                      PharmDemande
                    </a>
                    <a
                      href="#sensibilisation"
                      onClick={() => {
                        setIsOpen((prev) => !prev);
                        return true;
                      }}
                      className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                    >
                      Sensibilisation
                    </a>
                    <a
                      href="#activites-sociales"
                      onClick={() => {
                        setIsOpen((prev) => !prev);
                        return true;
                      }}
                      className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                    >
                      Activités sociales
                    </a>
                    <a
                      href="#activites-accompaneiment"
                      onClick={() => {
                        setIsOpen((prev) => !prev);
                        return true;
                      }}
                      className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap "
                    >
                      Accompagnements
                    </a>
                  </div>
                )}
              </div>
              <div className="items-center relative">
                <div className="flex items-center">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen1((prev) => !prev);
                    }}
                    className="text-black hover:text-blue-500 text-lg bg-transparent ml-6 flex items-center font-bold unselectable"
                  >
                    Evénement
                    {isOpen1 ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />}
                  </a>
                </div>
                {isOpen1 && (
                  <div className="bg-white absolute top-full left-0 mt-2 w-auto min-w-full rounded-md shadow-md anianim ">
                    <a
                      href="/ShowEvent/ShowEventc"
                      className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                    >
                      événement courant
                    </a>
                    <a
                      href="/ShowEvent"
                      className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap"
                    >
                      dernier événement
                    </a>
                  </div>
                )}
              </div>
              <a
                href="#partenaire"
                className="text-black  hover:text-blue-500 text-lg ml-6 unselectable"
              >
                Partenaire
              </a>
              <div className="items-center relative">
                <div className="flex items-center">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen2((prev) => !prev);
                    }}
                    className="text-black hover:text-blue-500 text-lg bg-transparent ml-6 flex items-center font-bold unselectable"
                  >
                    About
                    {isOpen2 ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />}
                  </a>
                </div>
                {isOpen2 && (
                  <div className="bg-white absolute top-full left-0 mt-2 w-auto min-w-full rounded-md shadow-md anianim ">
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                    >
                      Qui somme nous
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                    >
                      Comment nous rejoindre
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap"
                    >
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
              {isClick ? <IoMdClose /> : <VscListSelection />}
            </button>
          </div>
        </div>
      </div>
      {isClick && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
            <a
              href="/Publication"
              className="text-black hover:text-blue-500 text-lg ml-4 unselectable"
            >
              Publication
            </a>
            <div className="relative">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen((prev) => !prev);
                }}
                className="text-black hover:text-blue-500 text-lg ml-4 flex items-center font-bold unselectable"
              >
                Activité
                {isOpen ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />}
              </a>
              {isOpen && (
                <div className="bg-white absolute top-full left-0 mt-2 w-auto min-w-full rounded-md shadow-md z-10 anianim ">
                  <a
                    href="/donne_sang"
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                  >
                    Don du Sang
                  </a>
                  <a
                    href="/Maison_Eljiida"
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                  >
                    Maison Eljiida
                  </a>
                  <a
                    href="#med"
                    onClick={() => {
                      setIsOpen((prev) => !prev);
                      setisClick((prev) => !prev);
                      return true;
                    }}
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                  >
                    PharmDemande
                  </a>
                  <a
                    href="#sensibilisation"
                    onClick={() => {
                      setIsOpen((prev) => !prev);
                      setisClick((prev) => !prev);
                      return true;
                    }}
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                  >
                    Sensibilisation
                  </a>
                  <a
                    href="#activites-sociales"
                    onClick={() => {
                      setIsOpen((prev) => !prev);
                      setisClick((prev) => !prev);
                      return true;
                    }}
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                  >
                    Activités sociales
                  </a>
                  <a
                    href="#activites-accompaneiment"
                    onClick={() => {
                      setIsOpen((prev) => !prev);
                      setisClick((prev) => !prev);
                      return true;
                    }}
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap "
                  >
                    Accompagnements
                  </a>
                </div>
              )}
            </div>

            <div className="relative">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen1((prev) => !prev);
                }}
                className="text-black hover:text-blue-500 text-lg bg-transparent ml-4 flex items-center font-bold unselectable"
              >
                Evénement
                {isOpen1 ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />}
              </a>
              {isOpen1 && (
                <div className="bg-white absolute top-full left-0 mt-2 w-auto min-w-full rounded-md shadow-md z-10 anianim ">
                  <a
                    href="/ShowEvent/ShowEventc"
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                  >
                    Evénement courant
                  </a>
                  <a
                    href="/ShowEvent"
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap"
                  >
                    Dernier événement
                  </a>
                </div>
              )}
            </div>
            <a
              href="#partenaire"
              onClick={() => {
                setisClick((prev) => !prev);
                return true;
              }}
              className="text-black hover:text-blue-500 text-lg bg-transparent ml-4 flex items-center unselectable"
            >
              Partenaire
            </a>
            <div className="relative">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen2((prev) => !prev);
                }}
                className="text-black hover:text-blue-500 text-lg bg-transparent ml-4 flex items-center font-bold unselectable "
              >
                About
                {isOpen2 ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />}
              </a>
              {isOpen2 && (
                <div className="bg-white absolute top-full left-0 mt-2 w-auto min-w-full rounded-md shadow-md  anianim ">
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                  >
                    Qui somme nous
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b border-gray-200"
                  >
                    Comment nous rejoindre
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap"
                  >
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
