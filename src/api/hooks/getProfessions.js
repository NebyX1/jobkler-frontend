import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import { toast } from 'react-hot-toast';

// Función para obtener las profesiones
const fetchProfessions = async () => {
  try {
    const { data } = await axios.get('api/professions/');
    return data;
  } catch (error) {
    console.error('Error al obtener profesiones:', error);
    throw new Error('No se pudieron cargar las profesiones.');
  }
};

// Hook para obtener las profesiones
export const useGetProfessions = () => {
  return useQuery({
    queryKey: ['professions'],
    queryFn: fetchProfessions,
    staleTime: 5 * 60 * 1000, // Datos frescos durante 5 minutos
    cacheTime: 10 * 60 * 1000, // Mantener en caché por 10 minutos
    onError: (error) => {
      toast.error(error.message || 'Error al cargar profesiones.');
    },
  });
};
