import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { toast, Toaster } from 'react-hot-toast';

const Test = () => {
  const { register, handleSubmit } = useForm();
  const [imageUrl, setImageUrl] = useState(null);

  const cld = new Cloudinary({ cloud: { cloudName: 'dmc65vhh6' } });

  const onSubmit = async (data) => {
    const file = data.image[0];

    // Validaciones de tamaño y tipo
    if (file.size > 300 * 1024) {
      toast.error("La imagen debe ser menor de 300 KB");
      return;
    }
    if (file.type !== "image/webp") {
      toast.error("Solo se permiten imágenes en formato WebP");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');
    formData.append('folder', 'uploads');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dmc65vhh6/image/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        setImageUrl(result.secure_url); // Guarda la URL segura de Cloudinary para mostrar la imagen
        toast.success("Imagen subida con éxito!");
      } else {
        toast.error("Error al subir la imagen");
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor de Cloudinary");
    }
  };

  return (
    <div className='mt-5'>
      <Toaster position="top-center" reverseOrder={false} />
      <h4>Subir Imagen</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" accept="image/webp" {...register("image")} />
        <button type="submit">Subir</button>
      </form>

      {imageUrl && (
        <div>
          <h5>Imagen subida:</h5>
          <img src={imageUrl} alt="Subida a Cloudinary" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default Test;
