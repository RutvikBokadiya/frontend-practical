"use client";

import { useEffect, useState } from "react";
import styles from "../public/style/Sidebar.module.css";

import axios from "axios";
import { useRouter } from "next/navigation";
import { removeCookie } from "utils";
// import  from "";
import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("app/(private-layout)/dashboard/page"), {
  ssr: false,
});

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(
    typeof window !== "undefined" && window.location.pathname.replace("/", "")
      ? window.location.pathname.replace("/", "")
      : "weather"
  );
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get the current pathname
      const currentPath = window.location.pathname.replace("/", "");
      // Set activeTab based on current pathname
      setActiveTab(currentPath || "weather");
    }
  }, []);

  // Fetch weather data on component mount

  const handleClicked = (e) => {
    if (e === "logout") {
      removeCookie("user");
      removeCookie("token");
      router.push(`/login`);
      return;
    }
    setActiveTab(e);
    router.push(`/${e}`);
  };
  return (
    <div className={styles.sidebar}>
      <Dashboard />

      <h2>Dashboard</h2>
      <ul className={styles.menu}>
        <li
          className={activeTab === "weather" ? styles.active : ""}
          onClick={() => handleClicked("weather")}
        >
          Weather
        </li>
        <li
          className={activeTab === "chat" ? styles.active : ""}
          onClick={() => handleClicked("chat")}
        >
          Chat
        </li>
        <li
          className={activeTab === "logout" ? styles.active : ""}
          onClick={() => handleClicked("logout")}
        >
          logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
