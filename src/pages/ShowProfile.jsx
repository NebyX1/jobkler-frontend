import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserProfile } from "@/api/hooks/getUserProfile";
import { Container, Row, Col, Card, Modal, Image, Alert } from "react-bootstrap";
import styles from "@/styles/showprofile.module.css";
import WriteReviews from "@/components/reviews/WriteReviews";
import ShowReviews from "@/components/reviews/ShowReviews";
import MarkdownIt from "markdown-it";
import ErrorProfile from "@/components/search/ErrorProfile";

const mdParser = new MarkdownIt();

const ShowProfile = () => {
  const { id } = useParams();
  const { data: profile, isLoading, isError } = useUserProfile(id);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  if (isLoading) {
    return <p>Cargando datos de este usuario...</p>;
  }

  if (isError || !profile) {
    return (<ErrorProfile />
    );
  }

  // Función para abrir el modal con la imagen seleccionada
  const handleImageClick = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  // Crear el array de imágenes para la galería
  const images = [
    profile.portfolio1,
    profile.portfolio2,
    profile.portfolio3,
  ].filter((img) => img);

  return (
    <Container className={styles.container}>
      {/* Encabezado con imagen de encabezado */}
      <div className={styles.headerImage}>
        <img
          src="https://res.cloudinary.com/dmc65vhh6/image/upload/v1730263339/Profile_Bg_bvuxll.webp"
          alt="Imagen de encabezado"
          className={styles.businessImage}
        />
        <div className={styles.overlay}>
          <h1 className={styles.businessName}>
            {`${profile.name} ${profile.surname}`}
          </h1>
        </div>
      </div>

      {/* Perfil del Usuario */}
      <div className={styles.profileSection}>
        <Image
          src={profile.header}
          alt={`${profile.name} ${profile.surname}`}
          roundedCircle
          className={styles.profileImage}
        />
        <h2 className={styles.profession}>
          {profile.profession_name
            .replace(/_/g, " ")
            .replace(/^\w/, (c) => c.toUpperCase())}
        </h2>
        <p className={styles.location}>
          {profile.location_name
            .replace(/_/g, " ")
            .replace(/^\w/, (c) => c.toUpperCase())}
        </p>
      </div>

      {/* Sección Sobre mí */}
      <Card className={styles.descriptionCard}>
        <Card.Body>
          <Card.Title className={styles.cardTitle}>Sobre mí</Card.Title>
          <Card.Text className={styles.cardText}>
            <div
              dangerouslySetInnerHTML={{
                __html: mdParser.render(profile.about || ""),
              }}
            />
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Sección Descripción */}
      {profile.description && (
        <Card className={styles.descriptionCard}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Descripción</Card.Title>
            <Card.Text className={styles.cardText}>
              <div
                dangerouslySetInnerHTML={{
                  __html: mdParser.render(profile.description || ""),
                }}
              />
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {/* Información de contacto */}
      <Card className={styles.contactCard}>
        <Card.Body className="text-center">
          <Card.Title className={styles.contactTitle}>Contacto</Card.Title>
          <Card.Text className={styles.contactText}>
            Teléfono: {profile.phone}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Certificado */}
      {profile.certificate && (
        <div className={styles.certificateSection}>
          <h3 className={styles.sectionTitle}>Certificado</h3>
          <div className={styles.certificateImageContainer}>
            <img
              src={profile.certificate}
              alt="Certificado"
              className={styles.certificateImage}
              onClick={() => handleImageClick(profile.certificate)}
            />
          </div>
        </div>
      )}

      {/* Portafolio de Imágenes */}
      {images.length > 0 && (
        <div className={styles.portfolioSection}>
          <h3 className={styles.sectionTitle}>Portafolio</h3>
          <Row>
            {images.map((image, index) => (
              <Col
                key={index}
                xs={12}
                md={4}
                className={styles.portfolioCol}
              >
                <div className={styles.portfolioImageContainer}>
                  <img
                    className={styles.portfolioImage}
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    onClick={() => handleImageClick(image)}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Modal para ampliar imágenes */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Body className="p-0">
          <img src={modalImage} alt="Imagen ampliada" className="w-100" />
        </Modal.Body>
      </Modal>

      {/* Componente de Reviews */}
      <ShowReviews profileId={Number(profile.id)} />
      <WriteReviews
        profileId={Number(profile.id)}
        userId={Number(profile.user)}
      />
    </Container>
  );
};

export default ShowProfile;