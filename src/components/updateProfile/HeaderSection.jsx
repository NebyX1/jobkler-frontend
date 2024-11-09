import React from "react";
import { Container } from "react-bootstrap";
import styles from "@/styles/createprofile.module.css";

const HeaderSection = () => {
  return (
    <div className={styles.heroSection}>
      <Container className="text-center py-5">
        <h1 className={styles.title}>Actualizar tu Perfil</h1>
        <p className={styles.subTitle}>
          Actualiza tu perfil para mantener tus habilidades y servicios al día.
        </p>
      </Container>
    </div>
  );
};

export default HeaderSection;