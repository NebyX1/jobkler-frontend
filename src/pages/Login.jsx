import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Snippet from '@/snippet/Snippet';
import LoginForm from '@/components/auth/LoginForm';
import ResetPasswordModal from '@/components/auth/ModalRecoverPass'; // Asegúrate de que la ruta sea correcta
import styles from '@/styles/login.module.css';

const Login = () => {
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  // Funciones para abrir y cerrar el modal
  const handleOpenResetPasswordModal = () => setShowResetPasswordModal(true);
  const handleCloseResetPasswordModal = () => setShowResetPasswordModal(false);

  return (
    <section className={styles.loginSection}>
      <Snippet pageName="Iniciar Sesión" />
      <div>
        {/* Hero Section con Imagen de Fondo */}
        <div className={`${styles.heroSection}`}>
          <Container>
            <Row className="justify-content-center text-center pt-5">
              <Col lg={8}>
                <h1 className={styles.title}>Bienvenido de Nuevo a Jobkler</h1>
                <p className={styles.subTitle}>
                  Accede a tu cuenta y continúa conectando con oportunidades excepcionales.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Form Section */}
        <Container className={styles.formSection}>
          <Row className="justify-content-center p-2">
            <Col md={8} lg={6}>
              <LoginForm />
              {/* Enlace para recuperar contraseña */}
              <p className="text-center mt-3">
                <a href="#" onClick={handleOpenResetPasswordModal} className={styles.resetPasswordLink}>
                  ¿Olvidaste tu contraseña?
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Modal para restablecer contraseña */}
      <ResetPasswordModal
        show={showResetPasswordModal}
        handleClose={handleCloseResetPasswordModal}
      />
    </section>
  );
};

export default Login;

