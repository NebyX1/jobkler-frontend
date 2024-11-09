import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordConfirm } from "@/api/hooks/useResetPasswordConfirm";
import { toast } from "react-hot-toast";
import styles from "@/styles/resetpasswordpage.module.css";

// Esquema de validación
const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Campo obligatorio"),
  reNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Las contraseñas deben coincidir")
    .required("Campo obligatorio"),
});

const PasswordResetForm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { mutate: resetPasswordConfirm, isLoading } = useResetPasswordConfirm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {
    resetPasswordConfirm(
      {
        uid,
        token,
        new_password: values.newPassword,
        re_new_password: values.reNewPassword,
      },
      {
        onSuccess: () => {
          toast.success("Contraseña restablecida con éxito.");
          navigate("/login");
        },
        onError: (error) => {
          toast.error(error.message || "Error al restablecer la contraseña");
        },
      }
    );
  };

  return (
    <Container className={`shadow p-5 bg-white rounded-lg mt-2 ${styles.formContainer}`}>
      <h2 className={`${styles.formTitle} text-center mb-4`}>Establece una Nueva Contraseña</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          Restablecer Contraseña
        </Button>
      </Form>
    </Container>
  );
};

export default PasswordResetForm;
