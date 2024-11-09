import React from 'react';
import Snippet from '@/snippet/Snippet';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from '@/styles/about.module.css';

const About = () => {
  return (
    <section>
      <Snippet pageName="Sobre Nosotros" />

      <div>
        {/* Hero Section */}
        <div className={`${styles.heroSection}`}>
          <Container className="text-center py-5">
            <h1 className={`${styles.title}`}>Sobre Jobkler</h1>
            <p className={`${styles.subTitle}`}>
              Conectando talentos excepcionales con oportunidades que transforman vidas.
            </p>
          </Container>
        </div>

        {/* Description Section */}
        <div className={`${styles.section}`}>
          <Container>
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                <h2 className={`${styles.sectionTitle} text-center`}>¿Qué es Jobkler?</h2>
                <p className={`${styles.text} text-center`}>
                  En un mundo donde la agilidad y la eficiencia son clave para el éxito, Jobkler emerge como una solución innovadora que revoluciona la forma en que las personas conectan con servicios y talentos excepcionales. No somos simplemente una plataforma más; somos el puente que une habilidades extraordinarias con necesidades reales, facilitando conexiones que impulsan cambios positivos en la vida de las personas.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Vision Section */}
        <div className={`${styles.lightSection}`}>
          <Container>
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                <h2 className={`${styles.sectionTitle} text-center`}>Nuestra Visión</h2>
                <p className={`${styles.text} text-center`}>
                  Aspiramos a ser la plataforma líder que redefine la interacción entre proveedores de servicios y clientes. Nuestra visión es crear un ecosistema donde cada conexión sea una oportunidad para crecer, aprender y prosperar, construyendo un mundo más conectado y eficiente donde el talento y las necesidades se encuentran en perfecta armonía.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Mission Section */}
        <div className={`${styles.section}`}>
          <Container>
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                <h2 className={`${styles.sectionTitle} text-center`}>Nuestra Misión</h2>
                <p className={`${styles.text} text-center`}>
                  En Jobkler, creemos en el poder de las personas y en las posibilidades ilimitadas que surgen cuando el talento encuentra su lugar. Nuestra misión es simplificar y agilizar el proceso de conexión entre quienes ofrecen servicios excepcionales y quienes los necesitan, creando una experiencia única que transforma vidas y genera valor en cada interacción.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Commitment of Value Section */}
        <div className={`${styles.lightSection}`}>
          <Container>
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                <h2 className={`${styles.sectionTitle} text-center`}>Nuestro Compromiso</h2>
                <p className={`${styles.text} text-center`}>
                  Estamos comprometidos con la excelencia, la integridad y la innovación. En Jobkler, cada usuario es valorado y respetado, y nos esforzamos por ofrecer una plataforma inclusiva y accesible para todos. Nos dedicamos a impulsar el éxito de nuestros usuarios, proporcionando las herramientas y el soporte necesarios para alcanzar sus objetivos y superar sus expectativas.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Why Choose Us Section */}
        <div className={`${styles.section}`}>
          <Container>
            <h2 className={`${styles.sectionTitle} text-center mb-5`}>¿Por Qué Elegir Jobkler?</h2>
            <Row>
              {/* Feature 1 */}
              <Col md={6} className="mb-4">
                <Card className={`${styles.cardFeature} h-100`}>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <span className={`${styles.icon} me-3`}>🔧</span>
                      <Card.Title className={`${styles.featureTitle}`}>Soluciones Inmediatas</Card.Title>
                    </div>
                    <Card.Text className={`${styles.text}`}>
                      ¿Necesitas un profesional de confianza de manera urgente? Jobkler te conecta al instante con expertos verificados listos para ofrecer soluciones rápidas y efectivas a tus necesidades, ya sea para proyectos personales o empresariales.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Feature 2 */}
              <Col md={6} className="mb-4">
                <Card className={`${styles.cardFeature} h-100`}>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <span className={`${styles.icon} me-3`}>🌐</span>
                      <Card.Title className={`${styles.featureTitle}`}>Plataforma Intuitiva</Card.Title>
                    </div>
                    <Card.Text className={`${styles.text}`}>
                      Nuestra plataforma está diseñada pensando en ti, con una interfaz amigable y fácil de usar que hace que encontrar el servicio o talento que necesitas sea una experiencia agradable y sin complicaciones.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Feature 3 */}
              <Col md={6} className="mb-4">
                <Card className={`${styles.cardFeature} h-100`}>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <span className={`${styles.icon} me-3`}>🌟</span>
                      <Card.Title className={`${styles.featureTitle}`}>Talento Verificado</Card.Title>
                    </div>
                    <Card.Text className={`${styles.text}`}>
                      En Jobkler, valoramos la calidad y la confianza. Todos nuestros profesionales pasan por un riguroso proceso de verificación para asegurarnos de que recibas el mejor servicio posible, garantizando satisfacción en cada conexión.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Feature 4 */}
              <Col md={6} className="mb-4">
                <Card className={`${styles.cardFeature} h-100`}>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <span className={`${styles.icon} me-3`}>🚀</span>
                      <Card.Title className={`${styles.featureTitle}`}>Oportunidades Ilimitadas</Card.Title>
                    </div>
                    <Card.Text className={`${styles.text}`}>
                      Ya seas un profesional buscando expandir tu clientela o alguien en busca de soluciones especializadas, Jobkler abre un mundo de oportunidades, conectándote con personas y proyectos que impulsarán tu crecimiento personal y profesional.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Conclusion Section */}
        <div className={`${styles.lightSection}`}>
          <Container>
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                <h2 className={`${styles.sectionTitle} text-center`}>Jobkler: Tu Aliado en el Éxito</h2>
                <p className={`${styles.text} text-center`}>
                  En un mundo que avanza a la velocidad de la luz, Jobkler es tu aliado confiable que te ayuda a estar un paso adelante. Conecta con profesionales excepcionales o lleva tus habilidades al siguiente nivel. ¡Descubre todo lo que puedes lograr con Jobkler a tu lado!
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default About;
