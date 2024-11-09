import React from 'react';
import Snippet from '@/snippet/Snippet';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/legal.module.css';

const Legal = () => {
  return (
    <section>
      <Snippet pageName="Información Legal" />
      {/* Hero Section */}
      <div className={`${styles.heroSection} mt-5`}>
        <Container className="text-center py-5">
          <h1 className={`${styles.title}`}>Información Legal</h1>
          <p className={`${styles.subTitle}`}>
            Transparencia y confianza en cada conexión.
          </p>
        </Container>
      </div>

      {/* Privacy Policy Section */}
      <div className={`${styles.section}`}>
        <Container>
          <Row>
            <Col>
              <h2 className={`${styles.sectionTitle}`}>Política de Privacidad</h2>
              <p className={`${styles.text}`}>
                En Jobkler, nos comprometemos a proteger tu privacidad y a manejar tus datos personales con el más alto nivel de seguridad y confidencialidad. Esta política de privacidad describe cómo recopilamos, usamos, almacenamos y protegemos tu información.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>1. Recopilación de Datos</h3>
              <p className={`${styles.text}`}>
                Recopilamos información personal que nos proporcionas directamente al crear una cuenta, utilizar nuestros servicios o interactuar con la plataforma. Esto puede incluir tu nombre, dirección de correo electrónico, información de contacto y detalles relacionados con tus habilidades y servicios.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>2. Uso de los Datos</h3>
              <p className={`${styles.text}`}>
                Utilizamos tus datos para facilitar las conexiones entre proveedores de servicios y clientes, mejorar la experiencia del usuario, personalizar el contenido y los servicios que ofrecemos, y comunicarte actualizaciones importantes sobre la plataforma.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>3. Compartición de Datos con Terceros</h3>
              <p className={`${styles.text}`}>
                Tus datos personales serán compartidos con terceros únicamente cuando esto resulte en una mejora del servicio para todas las partes implicadas. Nos aseguramos de que cualquier tercero con el que compartamos información cumpla con estándares de seguridad y privacidad equivalentes a los nuestros.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>4. Seguridad de los Datos</h3>
              <p className={`${styles.text}`}>
                Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra acceso no autorizado, pérdida o alteración. Sin embargo, ten en cuenta que ninguna transmisión de datos por Internet es completamente segura.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>5. Tus Derechos</h3>
              <p className={`${styles.text}`}>
                Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. Para ejercer estos derechos, por favor contáctanos a través de nuestro correo electrónico de soporte.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>6. Cookies y Tecnologías Similares</h3>
              <p className={`${styles.text}`}>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestra plataforma. Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar la funcionalidad de algunos servicios.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>7. Cambios en la Política de Privacidad</h3>
              <p className={`${styles.text}`}>
                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Te notificaremos sobre cambios significativos mediante un aviso en nuestra plataforma o a través de tu correo electrónico registrado.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Terms of Use Section */}
      <div className={`${styles.lightSection}`}>
        <Container>
          <Row>
            <Col>
              <h2 className={`${styles.sectionTitle}`}>Términos de Uso</h2>
              <p className={`${styles.text}`}>
                Al utilizar la plataforma Jobkler, aceptas cumplir con los siguientes términos y condiciones.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>1. Uso de la Plataforma</h3>
              <p className={`${styles.text}`}>
                Jobkler actúa como intermediario que conecta a proveedores de servicios con clientes. No nos hacemos responsables de las interacciones, acuerdos o transacciones que se realicen entre los usuarios.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>2. Responsabilidad del Usuario</h3>
              <p className={`${styles.text}`}>
                Es responsabilidad de cada usuario comportarse de acuerdo con las normas legales y éticas. Los usuarios deben proporcionar información veraz y exacta y cumplir con todas las leyes y regulaciones aplicables.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>3. Propiedad Intelectual</h3>
              <p className={`${styles.text}`}>
                Todo el contenido y materiales disponibles en Jobkler, incluyendo pero no limitado a texto, gráficos, logotipos y software, son propiedad de Jobkler o están licenciados para su uso. Queda prohibida su reproducción, distribución o uso no autorizado.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>4. Limitación de Responsabilidad</h3>
              <p className={`${styles.text}`}>
                Jobkler no será responsable por ningún daño directo, indirecto, incidental o consecuente que resulte del uso o la imposibilidad de usar la plataforma. No garantizamos la exactitud o integridad de los contenidos proporcionados por los usuarios.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>5. Modificaciones de los Términos</h3>
              <p className={`${styles.text}`}>
                Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma. Es responsabilidad del usuario revisar periódicamente los términos actualizados.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>6. Terminación</h3>
              <p className={`${styles.text}`}>
                Podemos suspender o terminar tu acceso a Jobkler en cualquier momento, sin previo aviso, si violas estos Términos de Uso o por cualquier otra razón que consideremos apropiada.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>7. Ley Aplicable y Jurisdicción</h3>
              <p className={`${styles.text}`}>
                Estos términos se rigen por las leyes del país en el que operamos. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales competentes de dicha localidad.
              </p>

              <h3 className={`${styles.subSectionTitle}`}>8. Contacto</h3>
              <p className={`${styles.text}`}>
                Si tienes preguntas sobre estos Términos de Uso, por favor contáctanos a través de nuestro correo electrónico de soporte.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Disclaimer Section */}
      <div className={`${styles.section}`}>
        <Container>
          <Row>
            <Col>
              <h2 className={`${styles.sectionTitle}`}>Descargo de Responsabilidad</h2>
              <p className={`${styles.text}`}>
                La información proporcionada en Jobkler es solo para fines informativos generales. No garantizamos la exactitud, integridad o utilidad de esta información. Cualquier confianza que deposites en dicha información es estrictamente bajo tu propio riesgo.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Contact Information Section */}
      <div className={`${styles.contactSection}`}>
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className={`${styles.sectionTitle}`}>Contacto Legal</h2>
              <p className={`${styles.text}`}>
                Si tienes alguna pregunta o inquietud acerca de nuestra información legal, por favor contáctanos a través de nuestro correo electrónico:{" "}
                <a href="mailto:ingo@jobkler.com" className="text-info">
                  info@jobkler.com
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Legal;


