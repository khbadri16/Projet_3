import Link from "next/link";
import React from "react";

export default function Addbutton() {
  return (
    <Link href="/admin">
      <div className="card">
        <div className="card-content">
          <img
            src="/addpost.jpg"
            className="add-event-img"
            alt="Add Event"
            width="300"
            height="100"
          />
          <div className="post-details">
            <strong></strong>

            <h2></h2>

            <footer>
              <span></span>
              <span> </span>
            </footer>
          </div>
        </div>
      </div>
    </Link>
  );
}
