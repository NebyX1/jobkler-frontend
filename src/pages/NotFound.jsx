import React from "react";
import { Link } from "react-router-dom";
import Snippet from "@/snippet/Snippet";
import styles from "@/styles/notfound.module.css";

const NotFound = () => {
  return (
    <section className={styles.notFoundSection}>
      <Snippet pageName="Página No Encontrada" />
      <div className={`${styles.heroSection}`}>
        <div className="text-center">
          <h1 className={styles.title}>Ups... Algo salió mal</h1>
          <p className={styles.subTitle}>
            Parece que algo se ha perdido... página no encontrada
          </p>
        </div>
      </div>
      <div className={`${styles.btnContainer}`}>
        <Link to="/" className={styles.homeButton}>
          Página Principal
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
