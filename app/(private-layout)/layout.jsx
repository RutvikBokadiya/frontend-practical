"use client";
import Sidebar from "components/sidebar";
import styles from "../../public/style/PrivateLayout.module.css";
import Header from "components/header";
export default function PrivateLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
