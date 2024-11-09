import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';

const activateUserAccount = async ({ uid, token }) => {
  try {
    const { data } = await axios.post('api/auth/users/activation/', { uid, token });
    return data;
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error('El token de activación es inválido o ha expirado.');
    }
    throw error;  // Otros posibles errores
  }
};

export const useActivateUser = () => {
  return useMutation({
    mutationFn: activateUserAccount,  // Definimos explícitamente la función de mutación
  });
};
