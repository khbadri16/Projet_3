"use client";
import AdminCheck from "@/componenets/Admincheck";
import Separer from "@/components_3/Aline";
import Titre from "@/components_3/Title";
import React from "react";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";
import Sidebar from "../Styles/sidebarr";
export default function Admin() {
  const userData = useUserdata();

  return (
    <>
      <UserContext.Provider value={userData}>
        <AdminCheck>
          <Sidebar />
          <Titre titre={"Welcome to Administration "} />
          <div className="gif-container">
            <div
              className="tenor-gif-embed"
              data-postid="10974154"
              data-share-method="host"
              data-aspect-ratio="1.33333"
            >
              <a href="https://tenor.com/view/homer-simpson-spinning-chair-nuclear-gif-10974154">
                Homer Simpson GIF
              </a>
              from <a href="https://tenor.com/search/homer-gifs">Homer GIFs</a>
            </div>
            <script
              type="text/javascript"
              async
              src="https://tenor.com/embed.js"
            ></script>
          </div>
        </AdminCheck>
      </UserContext.Provider>
    </>
  );
}
