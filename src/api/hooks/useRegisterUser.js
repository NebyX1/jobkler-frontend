import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';

// Función para registrar un nuevo usuario
const registerUser = async (userData) => {
  try {
    const { data } = await axios.post("api/auth/users/", userData);
    return data;
  } catch (error) {
    // Si hay un error de respuesta y contiene datos, lanza un error con esos datos
    if (error.response && error.response.data) {
      // Personalizar el mensaje de error
      const errorMessage = Object.values(error.response.data).join(" ");
      throw new Error(errorMessage);
    } else {
      // Error genérico si no hay datos específicos
      throw new Error('Hubo un problema al registrar al usuario.');
    }
  }
};

// Hook para el registro de usuarios
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,  // Definimos explícitamente la función de mutación
  });
};
