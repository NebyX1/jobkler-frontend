import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import { toast } from 'react-hot-toast';

const fetchAvailableProfessions = async (locationCode, professions) => {
  if (!locationCode || professions.length === 0) return [];

  try {
    const params = { location: locationCode };
    const { data: profilesByLocation } = await axios.get('api/profiles/', { params });

    // Extraer IDs de profesión y eliminar duplicados
    const professionIds = [...new Set(profilesByLocation.map(profile => profile.profession).filter(Boolean))];

    // Mapear IDs a nombres
    const availableProfNames = professionIds
      .map(id => {
        const profession = professions.find(prof => prof.id === parseInt(id, 10));
        return profession ? profession.name : null;
      })
      .filter(Boolean);

    return availableProfNames;
  } catch (error) {
    console.error('Error al obtener profesiones disponibles:', error);
    throw new Error('No se pudieron cargar las profesiones disponibles.');
  }
};

export const useGetAvailableProfessions = (locationCode, professions, shouldFetch) => {
  return useQuery({
    queryKey: ['availableProfessions', locationCode],
    queryFn: () => fetchAvailableProfessions(locationCode, professions),
    enabled: shouldFetch && !!locationCode && professions.length > 0,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    onError: (error) => {
      toast.error(error.message || 'Error al cargar profesiones disponibles.');
    },
  });
};
