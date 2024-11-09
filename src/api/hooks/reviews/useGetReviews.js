import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';

// Función para obtener las reviews de un perfil
const fetchReviews = async ({ queryKey }) => {
  const [_, profileId] = queryKey;
  try {
    const response = await axios.get(`api/reviews/?profile=${profileId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las reviews:', error);
    throw new Error('No se pudieron cargar las reviews.');
  }
};


// Hook para obtener las reviews de un perfil
export const useGetReviews = (profileId) => {
  return useQuery({
    queryKey: ['reviews', profileId],
    queryFn: fetchReviews,
    enabled: !!profileId, // Solo ejecuta la query si profileId está definido
    staleTime: 5 * 60 * 1000, // Datos frescos durante 5 minutos
    cacheTime: 10 * 60 * 1000, // Mantener en caché por 10 minutos
    onError: (error) => {
      console.error(error.message || 'Error al cargar reviews.');
    },
  });
};
