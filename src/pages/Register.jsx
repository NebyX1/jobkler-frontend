import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Snippet from '@/snippet/Snippet';
import RegisterForm from '@/components/auth/RegisterForm';
import styles from '@/styles/register.module.css';

const Register = () => {
  return (
    <section className={styles.registerSection}>
      <Snippet pageName="Crear Cuenta" />
      <div>
        {/* Hero Section con Imagen de Fondo */}
        <div className={`${styles.heroSection}`}>
          <Container>
            <Row className="justify-content-center text-center pt-5">
              <Col lg={8}>
                <h1 className={styles.title}>Únete a Jobkler</h1>
                <p className={styles.subTitle}>
                  ¡Da el Salto! Conecta con profesionales excepcionales y encuentra las mejores oportunidades.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Form Section */}
        <Container className={styles.formSection}>
          <Row className="justify-content-center p-2">
            <Col md={8} lg={6}>
              <RegisterForm />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Register;


