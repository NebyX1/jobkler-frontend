import React, { useState, useEffect } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Snippet from "@/snippet/Snippet";
import { useUserProfile } from "@/api/hooks/getUserProfile";
import { useUserInfo } from "@/api/hooks/getUserInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "@/utils/ResumePDF";
import styles from "@/styles/profile.module.css";
import quotes from "@/assets/quotes/FrasesMotivacionales";

const Profile = () => {
  const { data: userInfo, isLoading: userInfoLoading } = useUserInfo();
  const userId = userInfo?.id;
  const {
    data: userProfile,
    isLoading: profileLoading,
  } = useUserProfile(userId);

  const [enrichedProfile, setEnrichedProfile] = useState(null);

  useEffect(() => {
    if (userInfo && userProfile) {
      const profileWithEmail = {
        ...userProfile,
        email: userInfo.email,
      };
      setEnrichedProfile(profileWithEmail);
    }
  }, [userProfile, userInfo]);

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  if (userInfoLoading || profileLoading) {
    return <p className="mt-5">Cargando...</p>;
  }

  return (
    <section className="pb-2">
      <Snippet pageName="Perfil" />
      <div className={styles.heroSection}>
        <Container className="text-center py-5">
          <h1 className={styles.title}>
            Bienvenido,{" "}
            <span className={styles.username}>{userInfo?.username}</span>
          </h1>
        </Container>
      </div>

      {userProfile === null ? (
        // Mostrar contenido cuando no hay perfil
        <Container className={`mt-5 ${styles.profileContainer}`}>
          <Alert variant="warning" className="text-center">
            Para ofrecer servicios en Jobkler, primero debes crear tu perfil.
          </Alert>
          <div className="text-center">
            <Link to="/create-profile">
              <Button variant="primary" className="mt-3 me-2">
                Crear Perfil
              </Button>
            </Link>
            <Link to="/configuration">
              <Button variant="success" className="mt-3">
                Configuración
              </Button>
            </Link>
          </div>
        </Container>
      ) : !enrichedProfile ? (
        // Mostrar mensaje de carga mientras se prepara el perfil enriquecido
        <p className="mt-5">Cargando perfil...</p>
      ) : (
        // Mostrar contenido cuando hay un perfil
        <Container className={`mt-5 ${styles.profileContainer}`}>
          <Alert variant="success" className="text-center">
            <div className={styles.quoteContainer}>
              <p className={styles.quoteText}>"{randomQuote.frase}"</p>
              <p className={styles.quoteAuthor}>- {randomQuote.autor}</p>
            </div>
            <div className="text-center">
              <Link to="/update-profile">
                <Button variant="primary" className="mt-3 me-2">
                  Actualizar Perfil
                </Button>
              </Link>
              <Link to="/configuration">
                <Button variant="success" className="mt-3">
                  Configuración
                </Button>
              </Link>

              {/* Botón para descargar el currículum en PDF */}
              <PDFDownloadLink
                document={<ResumePDF profile={enrichedProfile} />}
                fileName="Curriculum.pdf"
              >
                {({ loading }) =>
                  loading ? (
                    <Button
                      variant="secondary"
                      className="mt-3 ms-2"
                      disabled
                    >
                      Generando PDF...
                    </Button>
                  ) : (
                    <Button variant="secondary" className="mt-3 ms-2">
                      Descargar Currículum
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </div>
          </Alert>
        </Container>
      )}
    </section>
  );
};

export default Profile;