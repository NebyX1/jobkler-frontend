import { useMutation } from "@tanstack/react-query";
import axios from "@/api/axios";

const changePassword = async ({ newPassword, reNewPassword, currentPassword }) => {
  try {
    const { data } = await axios.post('api/auth/users/set_password/', {
      new_password: newPassword,
      re_new_password: reNewPassword,
      current_password: currentPassword,
    });
    return data;
  } catch (error) {
    if (error.response?.status === 400) {
      const errorDetail = error.response.data;
      if (errorDetail?.new_password) {
        // Mensaje detallado sobre la debilidad de la contraseña o fallos específicos en la validación de la contraseña
        throw new Error(errorDetail.new_password.join(" "));
      } else if (errorDetail?.current_password) {
        // Error específico de la contraseña actual incorrecta
        throw new Error("La contraseña actual es incorrecta.");
      } else {
        // Mensaje genérico si el error no es específico
        throw new Error("Error al cambiar la contraseña. Verifica los datos ingresados.");
      }
    }
    throw new Error("Ocurrió un error al intentar cambiar la contraseña.");
  }
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};