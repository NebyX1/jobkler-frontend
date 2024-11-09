import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import { toast } from 'react-hot-toast';

// Función para obtener las ubicaciones
const fetchLocations = async () => {
  try {
    const { data } = await axios.get('api/locations/');
    return data;
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
    throw new Error('No se pudieron cargar las ubicaciones.');
  }
};

// Hook para obtener las ubicaciones
export const useGetLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations,
    staleTime: 5 * 60 * 1000, // Datos frescos durante 5 minutos
    cacheTime: 10 * 60 * 1000, // Mantener en caché por 10 minutos
    onError: (error) => {
      toast.error(error.message || 'Error al cargar ubicaciones.');
    },
  });
};
