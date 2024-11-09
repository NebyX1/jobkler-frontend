import { useMutation } from "@tanstack/react-query";
import axios from "@/api/axios";

// Función para actualizar el perfil del usuario
const updateProfile = async ({ userId, profileData }) => {
  try {
    // Solicitud PATCH al endpoint de actualización del perfil
    const { data } = await axios.patch(`/api/profiles/${userId}/edit/`, profileData);
    return data;
  } catch (error) {
    // Manejo de errores específicos del servidor
    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).join(" ");
      throw new Error(errorMessage);
    } else {
      // Mensaje de error genérico en caso de no tener información específica
      throw new Error("Ocurrió un error al intentar actualizar el perfil.");
    }
  }
};

// Hook para actualizar el perfil del usuario
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};
