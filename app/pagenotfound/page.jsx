// pages/404.js
import styles from "public/style/PageNotFound.module.css";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>Page Not Found</p>
      <Link href="/">Go to Home</Link>
    </div>
  );
};

export default PageNotFound;
