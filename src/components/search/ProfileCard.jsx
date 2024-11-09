import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Image } from 'react-bootstrap';
import styles from '@/styles/profilecard.module.css';

const ProfileCard = ({
  id,
  nombre,
  apellido,
  telefono,
  profile_image,
  sobre_mi,
  business_image,
}) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (id) {
      navigate(`/show-profile/${id}`);
    } else {
      console.error("ID no definido para este perfil");
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.headerImage}>
        <Card.Img
          src={business_image}
          alt="Imagen de portafolio"
          className={styles.businessImage}
        />
        <div className={styles.overlay}>
        </div>
      </div>
      <Card.Body className={styles.cardBody}>
        <div className={styles.profileImageContainer}>
          <Image
            src={profile_image}
            alt={nombre}
            roundedCircle
            className={styles.profileImage}
          />
        </div>
        <div className="text-center mt-4">
          <h3 className={styles.name}>{nombre} {apellido}</h3>
          <p className={styles.description}>
            {sobre_mi.length > 200 ? `${sobre_mi.slice(0, 200)}...` : sobre_mi}
          </p>
        </div>
        <div className="text-center mt-3">
          <p className={styles.phone}>Teléfono: {telefono}</p>
        </div>
        <div className="mt-4 text-center">
          <Button
            variant="secondary"
            className={styles.viewProfileButton}
            onClick={handleViewProfile}
          >
            Ver Perfil
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;