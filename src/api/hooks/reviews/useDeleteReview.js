import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axios';

// Función para borrar una review
const deleteReview = async (reviewId) => {
  try {
    const { data } = await axios.delete(`api/reviews/${reviewId}/delete/`);
    return data;
  } catch (error) {
    console.error('Error al borrar la review:', error);
    throw new Error('No se pudo borrar la review.');
  }
};

// Hook para borrar una review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries('reviews'); // Invalidar y refetch las reviews
    },
    onError: (error) => {
      console.error(error.message || 'Error al borrar review.');
    },
  });
};