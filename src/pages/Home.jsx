import React from "react";
import { Link } from "react-router-dom";
import Snippet from "@/snippet/Snippet";
import SearchBox from "@/components/search/SearchBox";
import styles from "@/styles/home.module.css";

const Home = () => {
  return (
    <section>
      <Snippet pageName="Home" />

      {/* SearchBox Section */}
      <div className={`${styles.searchBoxSection} mt-5 d-flex flex-column text-center`}>
        <div>
          <h1 className={styles.title}>Encuentra el servicio que buscas</h1>
        </div>
        <SearchBox />
      </div>

      {/* Hero Section */}
      <div className={`${styles.heroSection} mt-1`}>
        <div className="text-center py-5">
          <h1 className={styles.title}>Te damos la Bienvenida a Jobkler</h1>
          <p className={styles.subTitle}>
            Aquí tus sueños comienzan a crecer en grande, encuentra
            oportunidades únicas
          </p>
        </div>
      </div>

      {/* Oportunities Section */}
      <div className={`${styles.oportunitiesSection} mt-1 mb-1`}>
        <div className="text-center p-2">
          <p className={styles.oportunitiesText}>
            Abre las puertas de las oportunidades, ¡regístrate en Jobkler ya!
          </p>
          <Link
            to="/register"
            className={`${styles.roundedButton} btn btn-primary mt-3`}
          >
            ¡Regístrate YA!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
