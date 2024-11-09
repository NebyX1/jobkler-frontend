import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';

const resetPassword = async (email) => {
  try {
    const { data } = await axios.post("api/auth/users/reset_password/", { email });
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(Object.values(error.response.data).join(" "));
    } else {
      throw new Error('Error al intentar restablecer la contraseña');
    }
  }
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword, // Declaramos la función de mutación explícitamente
  });
};
