import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateReview } from '@/api/hooks/reviews/useCreateReview';
import { useUserInfo } from '@/api/hooks/getUserInfo';
import { Button, Form, Alert } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '@/store/useAuth';
import styles from '@/styles/writereviews.module.css';

// Esquema de validación de Yup
const schema = yup.object().shape({
  stars: yup.number().required('Por favor, selecciona una calificación.'),
  comment: yup
    .string()
    .required('Por favor, escribe tu reseña.')
    .max(500, 'La reseña no puede tener más de 500 caracteres.'),
});

const WriteReviews = ({ profileId, userId }) => {
  const auth = useAuth((state) => state.auth);
  const { data: userInfo, isLoading: isUserLoading } = useUserInfo();
  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate: createReview, isLoading: isSubmitting } = useCreateReview({
    onSuccess: () => {
      reset();
      toast.success("Review creada con éxito.");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Error al crear la review.";
      toast.error(errorMessage);
    },
  });

  const [rating, setRating] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const commentValue = watch("comment", "");

  const onSubmit = (data) => {
    createReview({ ...data, stars: rating, profile: profileId });
  };

  if (isUserLoading) {
    return <p>Cargando...</p>;
  }

  const isOwnProfile = userId === userInfo?.id;

  if (!auth) {
    return (
      <div className={styles.writeReviewContainer}>
        <Toaster position="top-center" reverseOrder={false} />
        <Alert variant="warning" className={styles.warningAlert}>
          Para escribir una reseña, debes crear una cuenta y autenticarte.
        </Alert>
      </div>
    );
  }

  return (
    <div className={`${styles.writeReviewContainer} p-2`}>
      <Toaster position="top-center" reverseOrder={false} />

      {isOwnProfile ? (
        <Alert variant="info" className={styles.warningAlert}>
          No puedes escribir una reseña en tu propio perfil.
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)} className={`${styles.reviewForm}`}>
          <h4 className={styles.sectionTitle}>Escribe una Reseña</h4>

          {/* Calificación con estrellas */}
          <Form.Group controlId="stars" className={styles.formGroup}>
            <Form.Label className={styles.label}>Calificación:</Form.Label>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`${styles.star} ${star <= rating ? styles.filledStar : ''}`}
                  onClick={() => {
                    setRating(star);
                    setValue("stars", star);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setRating(star);
                      setValue("stars", star);
                    }
                  }}
                  tabIndex={0}
                  aria-label={`Calificar con ${star} estrellas`}
                />
              ))}
            </div>
            {errors.stars && <p className={styles.error}>{errors.stars.message}</p>}
          </Form.Group>

          {/* Texto de la reseña */}
          <Form.Group controlId="comment" className={styles.formGroup}>
            <Form.Label className={styles.label}>Tu Reseña:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              maxLength={500} // Límite de 500 caracteres
              placeholder="Escribe tus comentarios aquí..."
              {...register("comment")}
              className={styles.textarea}
            />
            {errors.comment && <p className={styles.error}>{errors.comment.message}</p>}
            <div className={styles.characterCount}>
              {commentValue.length}/500 caracteres
            </div>
          </Form.Group>

          {/* Checkbox de verificación */}
          <div className={`${styles.checkboxContainer} customCheckbox mt-3`}>
            <Form.Check 
              type="checkbox"
              id="agreement"
              className={styles.customCheckbox}
              label="Entiendo que mi reseña no se podrá editar ni borrar una vez enviada."
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
          </div>

          {/* Botón de envío */}
          <Button
            type="submit"
            variant="primary"
            className={styles.submitButton}
            disabled={!agreed || isSubmitting} // Deshabilitar si el checkbox no está marcado
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default WriteReviews;

