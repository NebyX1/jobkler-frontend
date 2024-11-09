import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useChangePassword } from "@/api/hooks/useChangePass";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "@/styles/configuration.module.css";

// Esquema de validación de Yup
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("La contraseña actual es obligatoria"),
  newPassword: Yup.string()
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
    .required("La nueva contraseña es obligatoria"),
  reNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden")
    .required("Es necesario confirmar la nueva contraseña"),
});

const ChangePass = () => {
  const { mutate: changePassword, isLoading } = useChangePassword();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    changePassword(
      {
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
        reNewPassword: data.reNewPassword,
      },
      {
        onSuccess: () => {
          toast.success("Contraseña cambiada exitosamente");
          reset();
          navigate("/profile");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <Container className={styles.formContainer}>
      <h2 className={styles.formTitle}>Cambiar Contraseña</h2>
      <Form onSubmit={handleSubmit(onSubmit)} className={styles.formSection}>
        <Form.Group controlId="oldPassword" className="mb-3">
          <Form.Label className={styles.label}>Contraseña Actual</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña actual"
            {...register("oldPassword")}
            isInvalid={!!errors.oldPassword}
            className={styles.inputField}
          />
          <Form.Control.Feedback type="invalid">
            {errors.oldPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="newPassword" className="mb-3">
          <Form.Label className={styles.label}>Nueva Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu nueva contraseña"
            {...register("newPassword")}
            isInvalid={!!errors.newPassword}
            className={styles.inputField}
          />
          <Form.Control.Feedback type="invalid">
            {errors.newPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="reNewPassword" className="mb-4">
          <Form.Label className={styles.label}>Confirmar Nueva Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma tu nueva contraseña"
            {...register("reNewPassword")}
            isInvalid={!!errors.reNewPassword}
            className={styles.inputField}
          />
          <Form.Control.Feedback type="invalid">
            {errors.reNewPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          className={`w-100 ${styles.submitButton}`}
          disabled={isLoading}
        >
          Cambiar Contraseña
        </Button>
      </Form>
    </Container>
  );
};

export default ChangePass;



