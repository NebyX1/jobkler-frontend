import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Snippet from "@/snippet/Snippet";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import styles from "@/styles/resetpasswordpage.module.css";

const PasswordResetPage = () => {
  return (
    <section className={styles.passwordResetSection}>
      <Snippet pageName="Restablecer Contraseña" />
      <div className={`${styles.heroSection}`}>
        <Container>
          <Row className="justify-content-center text-center pt-5">
            <Col lg={8}>
              <h1 className={styles.title}>Restablece tu Contraseña</h1>
              <p className={styles.subTitle}>
                Ingresa una nueva contraseña para recuperar el acceso a tu cuenta.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className={styles.formSection}>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <PasswordResetForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PasswordResetPage;

