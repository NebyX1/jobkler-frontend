import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import { toast } from 'react-hot-toast';

// Función para obtener perfiles de usuario con parámetros de consulta
const fetchProfiles = async ({ profession, location }) => {
  try {
    const params = {};
    if (profession !== undefined && profession !== null) {
      params.profession = profession;
    }
    if (location !== undefined && location !== null) {
      params.location = location;
    }
    const { data } = await axios.get('api/profiles/', { params });
    return data;
  } catch (error) {
    console.error('Error al obtener los perfiles de usuario:', error);
    throw new Error('No se pudieron cargar los perfiles de usuario.');
  }
};

// Hook para obtener los perfiles de usuario con soporte de filtros
export const useGetProfiles = (profession, location) => {
  return useQuery({
    queryKey: ['profiles', profession, location],
    queryFn: () => fetchProfiles({ profession, location }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    onError: (error) => {
      toast.error(error.message || 'Error al cargar los perfiles.');
    },
  });
};
