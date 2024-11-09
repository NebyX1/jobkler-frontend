import { useMutation } from "@tanstack/react-query";
import axios from "@/api/axios";

const resetPasswordConfirm = async ({
  uid,
  token,
  new_password,
  re_new_password,
}) => {
  const response = await axios.post("api/auth/users/reset_password_confirm/", {
    uid,
    token,
    new_password,
    re_new_password,
  });
  return response.data;
};

export const useResetPasswordConfirm = () => {
  return useMutation({
    mutationFn: resetPasswordConfirm, // Declaramos explícitamente la función de mutación
  });
};
