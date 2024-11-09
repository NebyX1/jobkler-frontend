import React from 'react';
import Snippet from '@/snippet/Snippet';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from '@/styles/contact.module.css';

const Contact = () => {
  return (
    <section>
      <Snippet pageName="Contacto" />
      {/* Hero Section */}
      <div className={`${styles.heroSection}`}>
        <Container className="text-center py-5">
          <h1 className={`${styles.title}`}>Contacto</h1>
          <p className={`${styles.subTitle}`}>
            Estamos aquí para ayudarte. ¡Ponte en contacto con nosotros!
          </p>
        </Container>
      </div>

      {/* Contact Information Section */}
      <div className={`${styles.lightSection}`}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className={`${styles.sectionTitle}`}>Información de Contacto</h2>
              <p className={`${styles.text} mb-4`}>
                Si prefieres contactarnos directamente, puedes hacerlo a través de los siguientes medios:
              </p>
              <ul className={`${styles.contactInfo}`}>
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:contacto@jobkler.com" className="text-info">
                    contacto@jobkler.com
                  </a>
                </li>
                <li>
                  <strong>Teléfono:</strong>{' '}
                  <a href="tel:+59844441142" className="text-info">
                    +598 4444 1142
                  </a>
                </li>
                <li>
                  <strong>Minas</strong> Lavalleja, Uruguay
                </li>
              </ul>
              {/* Botón para abrir el cliente de correo */}
              <Button
                href="mailto:contacto@jobkler.com"
                className={`${styles.submitButton} mt-3`}
              >
                Enviar Correo
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Contact;
