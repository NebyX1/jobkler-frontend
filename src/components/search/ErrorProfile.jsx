import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/errorprofile.module.css';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorProfile = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container className={styles.errorContainer}>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <div className={styles.errorContent}>
            <FaExclamationTriangle className={styles.errorIcon} />
            <h1 className={styles.errorTitle}>Perfil No Encontrado</h1>
            <p className={styles.errorMessage}>
              Lamentablemente, el perfil que estás buscando no existe o ha ocurrido un error.
            </p>
            <Button variant="primary" onClick={handleGoBack} className={styles.goBackButton}>
              Volver al Inicio
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorProfile;