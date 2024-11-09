import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useResetPassword } from "@/api/hooks/useResetPassword";
import { toast } from "react-hot-toast";
import styles from "@/styles/resetpasswordmodal.module.css";

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
});

const ResetPasswordModal = ({ show, handleClose }) => {
  const { mutate: resetPassword } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {
    resetPassword(values.email, {
      onSuccess: () => {
        toast.success(
          "Revisa tu correo electrónico para continuar con el proceso de cambio de contraseña."
        );
        handleClose();
      },
      onError: (error) => {
        toast.error(
          error.message || "Error al intentar restablecer la contraseña"
        );
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Recuperar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label className={styles.label}>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
              {...register("email")}
              isInvalid={!!errors.email}
              className={styles.inputField}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            className={`w-100 ${styles.submitButton}`}
          >
            Recuperar Contraseña
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ResetPasswordModal;
