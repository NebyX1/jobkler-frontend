import { useMutation } from "@tanstack/react-query";
import axios from "@/api/axios";

const loginUser = async (user) => {
  try {
    const { data } = await axios.post("api/auth/jwt/create/", user);
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Usuario o contraseña incorrecta");
    }
    if (error.response?.status === 400) {
      throw new Error("Usuario o contraseña incorrecta");
    }
    if (error.response?.status === 404) {
      throw new Error("Error de conexión con el servidor");
    }
    throw error;
  }
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser, // Hay que definir de forma explícita la función a ejecutar
  });
};
