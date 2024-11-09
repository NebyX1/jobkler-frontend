import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axios';

// Función para crear un nuevo perfil de usuario
const createUserProfile = async (profileData) => {
  try {
    console.log('Datos enviados para el perfil:', profileData); // Mostrar los datos enviados en la consola
    const { data } = await axios.post("/api/profiles/create/", profileData);
    return data;
  } catch (error) {
    // Verifica si hay un error de respuesta específico del backend
    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).join(" ");
      throw new Error(errorMessage); // Lanza un error con un mensaje específico
    } else {
      // Mensaje de error genérico
      throw new Error('Hubo un problema al crear el perfil de usuario.');
    }
  }
};

// Hook para crear el perfil de usuario
export const useCreateUserProfile = () => {
  return useMutation({
    mutationFn: createUserProfile, // Definimos la función de mutación
  });
};
