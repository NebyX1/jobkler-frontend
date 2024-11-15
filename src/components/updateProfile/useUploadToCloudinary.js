import axios from 'axios';
import { toast } from 'react-hot-toast';

const CLOUD_NAME = 'dmc65vhh6';
const UPLOAD_PRESET = 'ml_default';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const useUploadToCloudinary = (userId) => {
  const folderPath = `uploads/user_${userId}`;

  // Función para verificar si una imagen existe en Cloudinary
  const checkImageExists = async (publicId) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}api/cloudinary/check-image/`,
        { publicId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response.data.exists;
    } catch (error) {
      console.error('Error al verificar la existencia de la imagen:', error);
      return false;
    }
  };

  const uploadImage = async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', folderPath);
    formData.append('public_id', `${type}_${userId}`);

    // Validar el tamaño y tipo de la imagen antes de la subida
    if (file.size > 300 * 1024) {
      toast.error('La imagen debe ser menor de 300 KB');
      return null;
    }
    if (file.type !== 'image/webp') {
      toast.error('Solo se permiten imágenes en formato WebP');
      return null;
    }

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success('Imagen subida con éxito');
        return result.secure_url;
      } else {
        toast.error(`Error al subir la imagen: ${result.error.message}`);
        console.error(result);
        return null;
      }
    } catch (error) {
      toast.error('Error al conectar con Cloudinary');
      console.error(error);
      return null;
    }
  };

  const deleteImage = async (publicIds) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}api/cloudinary/delete-image/`,
        { publicIds }, // Enviamos un array con el publicId
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.success) {
        toast.success('Imagen eliminada correctamente');
        return response.data; // Retornamos los datos completos
      } else {
        toast.error('No se pudo eliminar la imagen');
        console.error(response.data.message);
        return response.data; // Retornamos los datos completos
      }
    } catch (error) {
      toast.error('Error al eliminar la imagen');
      console.error(error);
      return { success: false, message: 'Error al eliminar la imagen' };
    }
  };

  return { uploadImage, deleteImage, checkImageExists }; // Incluimos checkImageExists en el retorno
};

export default useUploadToCloudinary;