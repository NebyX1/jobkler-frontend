import React from "react";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "@/styles/footer.module.css";

const Footer = () => {
  return (
    <footer
      className={`${styles.customInnerShadow} ${styles.footerFont} ${styles.bgColorFooter} text-dark p-4`}
    >
      <Container>
        {/* Enlaces de navegación */}
        <Row className="justify-content-center text-center mb-4">
          <Col xs="auto">
            <nav className="d-flex gap-3">
              <Link className={`${styles.linkHover}`} to="/about">
                Nosotros
              </Link>
              <Link className={`${styles.linkHover}`} to="/legal">
                Legal
              </Link>
              <Link className={`${styles.linkHover}`} to="/contact">
                Contacto
              </Link>
            </nav>
          </Col>
        </Row>

        {/* Íconos de redes sociales */}
        <Row className="justify-content-center text-center mb-4">
          <Col xs="auto">
            <nav className="d-flex gap-4">
              <a
                className={`${styles.twitter}`}
                href="https://www.instagram.com/jobkler_ok/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
              {/* <a
                className={`${styles.youtube}`}
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={24} />
              </a> */}
              <a
                className={`${styles.facebook}`}
                href="https://www.facebook.com/profile.php?id=61568704251531"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>
            </nav>
          </Col>
        </Row>

        {/* Derechos reservados */}
        <Row className="justify-content-center text-center">
          <Col xs="auto">
            <aside>
              <p className={`${styles.copyrightText}`}>
                &copy; {new Date().getFullYear()} - Jobkler
              </p>
            </aside>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
