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

      {/* Oportunities Section */}
      <div className={`${styles.oportunitiesSection} mt-1 mb-1`}>
        <div className="text-center p-2">
          <p className={styles.oportunitiesText}>
            Conoce como la Inteligencia Artificial puede impulsar tu perfil
          </p>
          <Link
            to="/take-action"
            className={`${styles.roundedButton} btn btn-primary mt-3`}
          >
            Impulsa Tu Perfil con IA
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
