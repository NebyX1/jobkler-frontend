import { useMutation } from "@tanstack/react-query";
import axios from "@/api/axios";

const deleteAccount = async (password) => {
  try {
    // Envía una solicitud DELETE con la contraseña actual como `current_password`
    await axios.delete('api/auth/users/me/', { data: { current_password: password } });
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error("Contraseña incorrecta o error en la solicitud");
    }
    throw new Error("Ocurrió un error al intentar eliminar tu cuenta");
  }
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
  });
};
