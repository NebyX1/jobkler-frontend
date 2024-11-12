import axios from 'axios';
import useAuth from '@/store/useAuth';
import { toast } from 'react-hot-toast';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitudes para añadir el token de acceso si está disponible
api.interceptors.request.use(
  (config) => {
    const auth = useAuth.getState().auth;
    if (auth?.access) {
      config.headers['Authorization'] = `Bearer ${auth.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const { auth, logout } = useAuth.getState();

    // Solo forzar logout si hay un usuario autenticado y se recibe un 401
    if (response && response.status === 401 && auth?.access) {
      toast.error("Sesión expirada. Por favor, inicia sesión de nuevo.");
      logout(); // Ejecuta el logout desde el store de Zustand
    }

    return Promise.reject(error);
  }
);

export default api;
