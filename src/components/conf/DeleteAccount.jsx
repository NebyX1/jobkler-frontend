import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useDeleteAccount } from '@/api/hooks/useDeleteUser';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/store/useAuth'; // Importamos el hook de autenticación
import styles from '@/styles/configuration.module.css';

// Esquema de validación de Yup
const validationSchema = Yup.object().shape({
  password: Yup.string().required("La contraseña es obligatoria"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirma tu contraseña"),
});

const DeleteAccount = () => {
  const { mutate: deleteAccount, isLoading } = useDeleteAccount();
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const logout = useAuth((state) => state.logout); // Obtenemos la función logout del estado de autenticación

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const { rePassword, ...filteredData } = data; // Excluye rePassword antes de enviar
    console.log("Datos enviados al backend:", filteredData); // Verificación de los datos enviados
    deleteAccount(filteredData.password, {
      onSuccess: () => {
        toast.success("Cuenta eliminada exitosamente");
        logout(); // Cerrar sesión automáticamente
        navigate("/"); // Redirige al usuario al home después de hacer logout
      },
      onError: (error) => {
        const errorMessage = error.message || "Error al intentar eliminar la cuenta";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Container className={styles.formContainer}>
      <h2 className={styles.formTitle}>Borrar Cuenta</h2>
      
      {/* Advertencia de seguridad */}
      <Alert variant="danger" show={showWarning} className="text-center">
        Está a punto de eliminar su cuenta de usuario. Esto tendrá como consecuencia la pérdida de todos sus datos, incluyendo su perfil, reviews y otros datos asociados. ¿Está seguro de que desea continuar?
      </Alert>

      {/* Checkbox de confirmación */}
      <div className="text-center mb-4">
        <Form.Check 
          type="checkbox" 
          label="¿Desea borrar su cuenta?" 
          onChange={(e) => setShowWarning(e.target.checked)} 
          className="text-danger"
        />
      </div>

      {/* Formulario de eliminación de cuenta */}
      {showWarning && (
        <Form onSubmit={handleSubmit(onSubmit)} className={styles.formSection}>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label className={styles.label}>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("password")}
              isInvalid={!!errors.password}
              className={styles.inputField}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="rePassword" className="mb-4">
            <Form.Label className={styles.label}>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirma tu contraseña"
              {...register("rePassword")}
              isInvalid={!!errors.rePassword}
              className={styles.inputField}
            />
            <Form.Control.Feedback type="invalid">
              {errors.rePassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="danger"
            type="submit"
            className={`w-100 ${styles.deleteButton}`}
            disabled={isLoading}
          >
            Borrar Cuenta
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default DeleteAccount;
