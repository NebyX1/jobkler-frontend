import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "@/styles/takeaction.module.css";

const TakeAction = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className={`${styles.heroSection}`}>
        <Container className="text-center py-5">
          <h1 className={`${styles.title}`}>Impulsa Tu Perfil con IA</h1>
          <p className={`${styles.subTitle}`}>
            Con Jobkler y la más avanzada tecología de Inteligencia Artificial, llevaremos tu perfil
            al siguiente nivel.
          </p>
        </Container>
      </div>

      {/* Step 1: Registro y Primeros Pasos */}
      <div className={`${styles.section}`}>
        <Container>
          <Row>
            <Col>
              <h2 className={`${styles.sectionTitle}`}>
                1. Regístrate y Empieza
              </h2>
              <p className={`${styles.text}`}>
                Completa el proceso de registro y, tras validar tu cuenta,
                podrás iniciar sesión en Jobkler. Una vez dentro, verás la
                opción de "Perfil" en la barra de navegación, donde podrás
                comenzar a construir tu presencia profesional.
              </p>
              <img
                src="https://res.cloudinary.com/dmc65vhh6/image/upload/v1731298639/Part_1-_Register_ioeac6.webp"
                alt="Registro"
                className={styles.image}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Step 2: Creación del Perfil */}
      <div className={`${styles.section}`}>
        <Container>
          <Row>
            <Col>
              <h2 className={`${styles.sectionTitle}`}>2. Crea tu Perfil</h2>
              <p className={`${styles.text}`}>
                Crea un perfil que refleje tanto tus habilidades blandas como
                duras, mostrando quién eres y lo que puedes aportar. Las
                habilidades blandas son aquellas competencias interpersonales
                que te ayudan a trabajar bien con los demás, como la
                comunicación o el liderazgo. Las habilidades duras son
                conocimientos técnicos específicos como lenguajes de
                programación o herramientas especializadas.
              </p>
              <img
                src="https://res.cloudinary.com/dmc65vhh6/image/upload/v1731298639/Part_2_-_Profile_jzjuj4.webp"
                alt="Creación del Perfil"
                className={styles.image}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Step 3: Actualizar Perfil */}
      <div className={`${styles.section}`}>
        <Container>
          <Row>
            <Col>
              <h2 className={`${styles.sectionTitle}`}>
                3. Actualiza tu Perfil
              </h2>
              <p className={`${styles.text}`}>
                Una vez creado el perfil, siempre podrás actualizarlo para
                reflejar tus nuevos logros y habilidades. Esta sección es donde
                nuestro asistente de IA entra en acción, ayudándote a pulir cada
                detalle de tu perfil profesional.
              </p>
              <img
                src="https://res.cloudinary.com/dmc65vhh6/image/upload/v1731298639/Part_3_-_Update_tamaxk.webp"
                alt="Actualizar Perfil"
                className={styles.image}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Step 4: Mejora tu Perfil con IA */}
      <div className={`${styles.section}`}>
        <Container>
          <Row>
            <Col>
              <h2 className={`${styles.sectionTitle}`}>
                4. Mejora tu Perfil con IA
              </h2>
              <p className={`${styles.text}`}>
                Nuestro asistente de IA es único en su clase y te ofrece
                recomendaciones personalizadas para mejorar tu perfil. Desde
                sugerencias de palabras clave hasta ideas para resaltar tus
                puntos fuertes, la IA de Jobkler hace que tu perfil sea
                atractivo y relevante en el mercado laboral.
              </p>
              <img
                src="https://res.cloudinary.com/dmc65vhh6/image/upload/v1731298639/Part_4_-_Open_fd96uw.webp"
                alt="Mejora con IA"
                className={styles.image}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Step 5: Logra un Currículum Profesional Impecable */}
      <div className={`${styles.section}`}>
        <Container>
          <Row>
            <Col>
              <h2 className={`${styles.sectionTitle}`}>
                5. Logra un Currículum Profesional Impecable
              </h2>
              <p className={`${styles.text}`}>
                Con la ayuda de la IA de Jobkler, podrás crear un currículum/perfil
                profesional que destaque tus mejores habilidades y logros,
                dándote una ventaja competitiva en tu búsqueda laboral.
              </p>
              <img
                src="https://res.cloudinary.com/dmc65vhh6/image/upload/v1731298639/Part_5_-_Ask_c0drcy.webp"
                alt="Currículum Profesional"
                className={styles.image}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default TakeAction;
