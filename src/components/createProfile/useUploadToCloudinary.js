// En useUploadToCloudinary.js

import { toast } from "react-hot-toast";

const CLOUD_NAME = "dmc65vhh6";
const UPLOAD_PRESET = "ml_default";

const useUploadToCloudinary = (userId) => {
  const uploadImage = async (file, type) => {
    if (file.size > 300 * 1024) {
      toast.error("La imagen debe ser menor de 300 KB");
      return null;
    }
    if (file.type !== "image/webp") {
      toast.error("Solo se permiten imágenes en formato WebP");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    // Aseguramos que userId está definido
    const folderPath = userId ? `uploads/user_${userId}` : `uploads/user_images`;

    formData.append("folder", folderPath);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Imagen subida con éxito");
        return result.secure_url;
      } else {
        toast.error("Error al subir la imagen");
        return null;
      }
    } catch (error) {
      toast.error("Error al conectar con Cloudinary");
      return null;
    }
  };

  return { uploadImage };
};

export default useUploadToCloudinary;
