import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import useAuth from '@/store/useAuth';
import { toast } from 'react-hot-toast';

const fetchUserInfo = async () => {
  try {
    const { data } = await axios.get('api/auth/users/me/');
    return data;
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    // Manejo de error específico
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.detail || 'Error al obtener la información del usuario.';
      throw new Error(errorMessage);
    } else {
      throw new Error('Ocurrió un error al intentar obtener la información del usuario.');
    }
  }
};

export const useUserInfo = () => {
  const auth = useAuth((state) => state.auth);

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    enabled: !!auth,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      toast.error(error.message || 'Error al cargar la información del usuario.');
    },
  });
};
