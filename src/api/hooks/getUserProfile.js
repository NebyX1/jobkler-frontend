import { useQuery } from "@tanstack/react-query";
import axios from "@/api/axios";
import { toast } from "react-hot-toast";

// Función para obtener un perfil de usuario específico por userId
const fetchUserProfile = async (userId) => {
  try {
    const { data } = await axios.get(`api/profiles/${userId}/`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Retornar null en lugar de lanzar un error para 404
      return null;
    } else {
      // Mostrar un mensaje de error amigable para otros errores
      toast.error("Ocurrió un error al obtener el perfil de usuario.");
      return null;
    }
  }
};

// Hook personalizado para obtener un perfil de usuario
export const useUserProfile = (userId) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId, // Solo ejecuta la query si userId está definido
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000, // 10 minutos
    retry: false, // No reintentar automáticamente en caso de error
  });
};
