import React from 'react';
import Snippet from '@/snippet/Snippet';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from '@/styles/resources.module.css';

const Recursos = () => {
  return (
    <section>
      <Snippet pageName="¿Qué te ofrece Jobkler?" />
      
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <Container className="text-center py-5">
          <h1 className={styles.title}>¿Qué te ofrece Jobkler?</h1>
          <p className={styles.subTitle}>
            Aquí encontrarás una guía detallada de todas las cosas que puedes hacer con Jobkler.
            Conecta con oportunidades, muestra tus talentos y comparte tu éxito con el mundo.
          </p>
        </Container>
      </div>

      {/* Content Section */}
      <Container className="py-5">
        <Row className="mb-4">
          <Col md={{ span: 10, offset: 1 }} className="text-center">
            <p className={styles.introText}>
              Jobkler es mucho más que una plataforma de ofertas laborales. Aquí, podrás crear un perfil único para exhibir tus habilidades, conectar con empleadores potenciales y construir una reputación profesional sólida. ¿Quieres que el mundo vea tu talento? Jobkler te brinda las herramientas para destacarte y mostrar tus trabajos de manera profesional y accesible.
            </p>
          </Col>
        </Row>
        <Row className="gy-4">
          <Col md={6} lg={4}>
            <Card className={`${styles.card} shadow-sm`}>
              <Card.Body>
                <Card.Title>📄 Crea tu Perfil Profesional</Card.Title>
                <Card.Text>
                  Diseña un perfil impactante y completo donde podrás añadir tu experiencia, habilidades, y cualquier detalle que destaque tu talento. Un perfil bien optimizado puede ayudarte a ser descubierto por los empleadores y clientes que buscan exactamente lo que tú ofreces.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className={`${styles.card} shadow-sm`}>
              <Card.Body>
                <Card.Title>🌎 Conéctate con el Mundo</Card.Title>
                <Card.Text>
                  Con Jobkler, tu talento no tiene límites geográficos. Comparte tu perfil y destaca tu trabajo a nivel global. Los empleadores de todo el mundo podrán encontrarte fácilmente y contactar contigo para futuras colaboraciones.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className={`${styles.card} shadow-sm`}>
              <Card.Body>
                <Card.Title>🖼️ Exhibe tus Trabajos</Card.Title>
                <Card.Text>
                  Sube ejemplos de tus mejores trabajos, ya sean proyectos pasados, fotografías, o cualquier muestra visual de tus habilidades. Cada muestra que subas se convierte en una prueba tangible de tu talento, accesible desde cualquier lugar.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className={`${styles.card} shadow-sm`}>
              <Card.Body>
                <Card.Title>⭐ Recibe Reseñas de Empleadores</Card.Title>
                <Card.Text>
                  Tus empleadores pueden dejar reseñas y recomendaciones en tu perfil, ayudando a construir tu reputación en la plataforma. Las reseñas son una excelente manera de validar tus habilidades y crear confianza en futuros clientes o empleadores.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className={`${styles.card} shadow-sm`}>
              <Card.Body>
                <Card.Title>📂 Organiza tu Portafolio</Card.Title>
                <Card.Text>
                  Jobkler te ofrece la posibilidad de organizar tus trabajos y proyectos en un portafolio accesible y visualmente atractivo. Cada proyecto agregado ayuda a crear una imagen completa de tus capacidades y logros.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className={`${styles.card} shadow-sm`}>
              <Card.Body>
                <Card.Title>🔗 Comparte Tu Éxito</Card.Title>
                <Card.Text>
                  Comparte tu perfil y portafolio en redes sociales y en otros sitios para que tanto empleadores como potenciales clientes puedan ver tu trayectoria profesional y habilidades destacadas.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Recursos;
