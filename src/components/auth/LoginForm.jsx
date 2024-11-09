import React from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Container, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLogin } from '@/api/hooks/useLogin';
import useAuth from '@/store/useAuth';
import styles from '@/styles/login.module.css';

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-zA-Z]/, "Debe contener al menos una letra")
    .matches(/\d/, "Debe contener al menos un número")
    .required("La contraseña es obligatoria"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuth((state) => state.login);
  const { mutate: login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {
    login(values, {
      onSuccess: (data) => {
        setAuth(data);
        toast.success("Inicio de sesión exitoso!");
        navigate("/home");
      },
      onError: (error) => {
        toast.error(error.message || "Error al iniciar sesión");
      },
    });
  };

  return (
    <Container className={`shadow p-5 bg-white rounded-lg ${styles.formContainer}`}>
      <h2 className={`${styles.formTitle} text-center mb-4`}>Iniciar Sesión</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>

        {/* Correo Electrónico */}
        <Form.Group controlId="email" className="mb-3">
          <Form.Label className={styles.label}>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo electrónico"
            {...register('email')}
            isInvalid={!!errors.email}
            className={styles.inputField}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Contraseña */}
        <Form.Group controlId="password" className="mb-4">
          <Form.Label className={styles.label}>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            {...register('password')}
            isInvalid={!!errors.password}
            className={styles.inputField}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className={`w-100 ${styles.submitButton}`}
          disabled={isSubmitting || isLoading}
        >
          Iniciar Sesión
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
