import React from "react";
import { Container } from "react-bootstrap";
import styles from "@/styles/createprofile.module.css";

const HeaderSection = () => {
  return (
    <div className={styles.heroSection}>
      <Container className="text-center py-5">
        <h1 className={styles.title}>Crear tu Perfil</h1>
        <p className={styles.subTitle}>
          Completa tu perfil para destacar tus habilidades y servicios.
        </p>
      </Container>
    </div>
  );
};

export default HeaderSection;
