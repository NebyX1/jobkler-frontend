import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRegister } from '@/api/hooks/useRegisterUser';
import { toast } from 'react-hot-toast';  // Para notificaciones
import styles from '@/styles/register.module.css';

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  username: Yup.string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .required('El nombre de usuario es obligatorio'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Es necesario confirmar la contraseña'),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const { mutate: registerUser, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data;  // Excluir confirmPassword
    const userWithRePassword = {
      ...userData,
      re_password: data.confirmPassword,
    };
    
    registerUser(userWithRePassword, {
      onSuccess: () => {
        toast.success('¡Registro exitoso! Por favor, revisa tu correo para activar tu cuenta.');
        navigate('/home'); 
      },
      onError: (error) => {
        toast.error(error.message || 'Error al registrar al usuario');
      },
    });
  };

  return (
    <Container className={`shadow p-5 bg-white ${styles.formContainer}`}>
      <h2 className={`${styles.formTitle} text-center mb-4`}>Crear una Cuenta</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <Form.Group controlId="username" className="mb-3">
          <Form.Label className={styles.label}>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Elige un nombre de usuario"
            {...register('username')}
            isInvalid={!!errors.username}
            className={styles.inputField}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label className={styles.label}>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Crea una contraseña"
            {...register('password')}
            isInvalid={!!errors.password}
            className={styles.inputField}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mb-4">
          <Form.Label className={styles.label}>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repite tu contraseña"
            {...register('confirmPassword')}
            isInvalid={!!errors.confirmPassword}
            className={styles.inputField}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          className={`w-100 ${styles.submitButton}`}
          disabled={isLoading}
        >
          Registrarse
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;

