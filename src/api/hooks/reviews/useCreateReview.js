import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';
import { toast } from 'react-hot-toast';

// Función para crear una review
const createReview = async (reviewData) => {
  try {
    const { data } = await axios.post('api/reviews/create/', reviewData);
    return data;
  } catch (error) {
    console.error('Error al crear la review:', error);

    // Extraer mensaje de error del backend
    let errorMessage = 'No se pudo crear la reseña.';
    if (error.response && error.response.data) {
      console.error('Error response data:', error.response.data); // Añade este log
      const data = error.response.data;
      if (typeof data === 'string') {
        errorMessage = data;
      } else if (data.detail) {
        errorMessage = data.detail;
      } else if (data.non_field_errors) {
        errorMessage = data.non_field_errors.join(', ');
      } else {
        errorMessage = Object.values(data).flat().join(', ');
      }
    }

    // Lanza el error con el mensaje obtenido
    throw new Error(errorMessage);
  }
};

// Hook para crear una review
export const useCreateReview = () => {
  return useMutation({
    mutationFn: createReview,
    onError: (error) => {
      console.error(error.message || 'Error al crear la reseña.');
      toast.error(error.message || 'Error al crear la reseña.');
    },
    onSuccess: () => {
      toast.success('¡Reseña creada con éxito!');
    },
  });
};