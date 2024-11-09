import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import DeleteAccount from "@/components/conf/DeleteAccount";
import ChangePass from "@/components/conf/ChangePass";
import Snippet from "@/snippet/Snippet";
import styles from "@/styles/configuration.module.css";

const Configuration = () => {
  return (
    <section>
      <Snippet pageName="Configuración" />

      {/* Header Section */}
      <div className={styles.heroSection}>
        <Container className="text-center py-5">
          <h1 className={styles.title}>Página de Configuración</h1>
        </Container>
      </div>

      {/* Tabs Section */}
      <Container className={styles.tabContainer}>
        <Tabs
          defaultActiveKey="changePassword"
          id="configuration-tabs"
          className={`justify-content-center ${styles.customTabs}`}
        >
          <Tab eventKey="changePassword" title="Cambiar Contraseña">
            <ChangePass />
          </Tab>
          <Tab eventKey="deleteAccount" title="Borrar Cuenta">
            <DeleteAccount />
          </Tab>
        </Tabs>
      </Container>
    </section>
  );
};

export default Configuration;

