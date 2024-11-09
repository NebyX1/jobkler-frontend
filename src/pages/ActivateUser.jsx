import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useActivateUser } from "@/api/hooks/useActivateUser";
import { Container, Alert, Spinner } from "react-bootstrap";
import styles from "@/styles/activateuser.module.css";
import { FaSmile, FaRegSadCry } from "react-icons/fa";
import { FaFaceGrinStars } from "react-icons/fa6";

const ActivateUser = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const {
    mutate: activateUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useActivateUser();

  // Efecto para activar el usuario cuando el uid y el token estén disponibles
  useEffect(() => {
    if (uid && token) {
      activateUser({ uid, token });
    }
  }, [uid, token, activateUser]);

  // Efecto para redirigir después de una activación exitosa
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta
    }
  }, [isSuccess, navigate]);

  // Mensaje de éxito
  if (isSuccess) {
    return (
      <Container
        fluid
        className={`${styles.bodyHeight} ${styles.centerContent}`}
      >
        <Alert
          variant="success"
          className={`text-center ${styles.alertSuccess}`}
        >
          ¡Cuenta activada con éxito! Bienvenido a la familia de Jobkler{" "}
          <FaSmile />
        </Alert>
      </Container>
    );
  }

  // Mensaje de error
  if (isError) {
    return (
      <Container
        fluid
        className={`${styles.bodyHeight} ${styles.centerContent}`}
      >
        <Alert variant="danger" className={`text-center ${styles.alertDanger}`}>
          Hubo un error al activar tu cuenta:{" "}
          <span className={`${styles.errorColor}`}>
            {error.response?.data?.detail || error.message} <FaRegSadCry />
          </span>
        </Alert>
      </Container>
    );
  }

  // Mensaje de carga
  if (isLoading) {
    return (
      <Container
        fluid
        className={`${styles.bodyHeight} ${styles.centerContent}`}
      >
        <Alert
          variant="primary"
          className={`text-center ${styles.alertPrimary}`}
        >
          Estamos activando tu cuenta...{" "}
          <Spinner animation="border" role="status" /> <FaSmile />
        </Alert>
      </Container>
    );
  }

  // Mensaje inicial cuando aún no ha comenzado la activación
  return (
    <Container fluid className={`${styles.bodyHeight} ${styles.centerContent}`}>
      <Alert
        variant="secondary"
        className={`text-center ${styles.alertSecondary}`}
      >
        Preparándonos para activar tu cuenta <FaFaceGrinStars />
      </Alert>
    </Container>
  );
};

export default ActivateUser;