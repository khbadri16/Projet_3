import React from "react";
import styles from "./styles.module.css";
import { FaPeopleGroup } from "react-icons/fa6";
import {
  FaBed,
  FaBriefcaseMedical,
  FaHandsHelping,
  FaHome,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { BiDonateBlood } from "react-icons/bi";
export default function Sidebar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles["navbar-nav"]}>
        <li className={styles.logo}>
          <a href="/Espace_admin" className={styles["nav-link"]}>
            <span className={`${styles["link-text"]} ${styles["logo-text"]}`}>
              Admin
            </span>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="angle-double-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
            >
              <g className={styles["fa-group"]}>
                <path
                  fill="currentColor"
                  d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                  className={styles["fa-secondary"]}
                ></path>
                <path
                  fill="currentColor"
                  d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                  className={styles["fa-primary"]}
                ></path>
              </g>
            </svg>
          </a>
        </li>

        <li className={styles["nav-item"]}>
          <a href="/Espace_admin/don_du_sang" className={styles["nav-link"]}>
            <div>
              <span className={styles["fa-group"]}>
                <BiDonateBlood
                  className={`${styles["fa-secondary"]} ${styles["fa-primary"]}`}
                />
              </span>
            </div>
            <span className={styles["link-text"]}>Don du sang</span>
          </a>
        </li>

        <li className={styles["nav-item"]}>
          <a
            href="/Espace_admin/gestion_reservation"
            className={styles["nav-link"]}
          >
            <div>
              <span className={styles["fa-group"]}>
                <FaBed
                  className={`${styles["fa-secondary"]} ${styles["fa-primary"]}`}
                  style={{ fontSize: "4rem" }}
                />
              </span>
            </div>
            <span className={styles["link-text"]}>Maison Eljiida</span>
          </a>
        </li>

        <li className={styles["nav-item"]}>
          <a href="/Espace_admin/demand_med" className={styles["nav-link"]}>
            <div>
              <span className={styles["fa-group"]}>
                <FaBriefcaseMedical
                  className={`${styles["fa-secondary"]} ${styles["fa-primary"]}`}
                  style={{ fontSize: "4rem" }}
                />
              </span>
            </div>
            <span className={styles["link-text"]}>Pharmacie</span>
          </a>
        </li>

        <li className={styles["nav-item"]}>
          <a href="/Espace_admin/add_partner" className={styles["nav-link"]}>
            <div>
              <span className={styles["fa-group"]}>
                <FaHandsHelping
                  className={`${styles["fa-secondary"]} ${styles["fa-primary"]}`}
                  style={{ fontSize: "4rem" }}
                />
              </span>
            </div>
            <span className={styles["link-text"]}>Partenaires</span>
          </a>
        </li>

        <li className={styles["nav-item"]}>
          <a href="/Espace_admin/event" className={styles["nav-link"]}>
            <div>
              <span className={styles["fa-group"]}>
                <FaPeopleGroup
                  className={`${styles["fa-secondary"]} ${styles["fa-primary"]}`}
                  style={{ fontSize: "4rem" }}
                />
              </span>
            </div>
            <span className={styles["link-text"]}>Participants</span>
          </a>
        </li>
        <li className={styles["nav-item"]}>
          <a href="/Espace_admin/members" className={styles["nav-link"]}>
            <div>
              <span className={styles["fa-group"]}>
                <IoIosPeople
                  className={`${styles["fa-secondary"]} ${styles["fa-primary"]}`}
                  style={{ fontSize: "4rem" }}
                />
              </span>
            </div>
            <span className={styles["link-text"]}>membres</span>
          </a>
        </li>
        <li className={styles["nav-item"]}>
          <a href="/" className={styles["nav-link"]}>
            <div>
              <span className={styles["fa-group"]}>
                <FaHome
                  className={`${styles["fa-secondary"]} ${styles["fa-primary"]}`}
                  style={{ fontSize: "4rem" }}
                />
              </span>
            </div>
            <span className={styles["link-text"]}>Home</span>
          </a>
        </li>

        <li className={styles["nav-item"]} id="themeButton"></li>
      </ul>
    </nav>
  );
}
