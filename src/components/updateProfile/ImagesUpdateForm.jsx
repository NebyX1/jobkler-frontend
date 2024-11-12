import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import styles from "@/styles/createprofile.module.css";
import useUploadToCloudinary from "@/components/updateProfile/useUploadToCloudinary";
import { toast } from "react-hot-toast";

const ImagesUpdateForm = ({ userId, userProfile, onImageUrlsChange }) => {
  const { uploadImage, deleteImage, checkImageExists } =
    useUploadToCloudinary(userId);
  const [showUpdateProfileAlert, setShowUpdateProfileAlert] = useState(false);
  const [imageFiles, setImageFiles] = useState({});
  const [imageUrls, setImageUrls] = useState({
    profileImage: "",
    certificate: "",
    portfolio1: "",
    portfolio2: "",
    portfolio3: "",
  });

  useEffect(() => {
    if (userProfile) {
      setImageUrls({
        profileImage: userProfile.header || "",
        certificate: userProfile.certificate || "",
        portfolio1: userProfile.portfolio1 || "",
        portfolio2: userProfile.portfolio2 || "",
        portfolio3: userProfile.portfolio3 || "",
      });
    }
  }, [userProfile]);

  useEffect(() => {
    const validateImagesExistence = async () => {
      if (!userProfile) return;

      const initialImageUrls = {
        profileImage: userProfile.header || "",
        certificate: userProfile.certificate || "",
        portfolio1: userProfile.portfolio1 || "",
        portfolio2: userProfile.portfolio2 || "",
        portfolio3: userProfile.portfolio3 || "",
      };

      const updatedUrls = { ...initialImageUrls };

      for (const type in initialImageUrls) {
        if (initialImageUrls[type]) {
          const publicId = getPublicIdFromUrl(initialImageUrls[type]);
          const exists = await checkImageExists(publicId);
          if (!exists) {
            updatedUrls[type] = "";
          }
        }
      }

      setImageUrls(updatedUrls);
      onImageUrlsChange(updatedUrls);
    };

    validateImagesExistence();
  }, [userProfile]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles((prevFiles) => ({
        ...prevFiles,
        [type]: file,
      }));
    }
  };

  const handleDeleteImage = async (type) => {
    const existingUrl = imageUrls[type];
    if (!existingUrl) {
      toast.error("No hay una imagen para eliminar.");
      return;
    }

    const publicId = getPublicIdFromUrl(existingUrl);
    if (!publicId) {
      toast.error("URL de imagen inválida.");
      return;
    }

    try {
      const response = await deleteImage([publicId]); // Ahora recibe response.data
      console.log("Respuesta del backend:", response);

      if (response.success) {
        // Buscar el resultado específico para el publicId
        const deletedResult = response.results.find(
          (r) => r.public_id === publicId
        );
        if (deletedResult && deletedResult.deleted) {
          const updatedUrls = {
            ...imageUrls,
            [type]: "",
          };
          setImageUrls(updatedUrls);
          setImageFiles((prevFiles) => ({
            ...prevFiles,
            [type]: null,
          }));
          toast.success(`Imagen de ${type} eliminada`);
          onImageUrlsChange(updatedUrls);

          // Mostrar el Alert
          setShowUpdateProfileAlert(true);
        } else {
          const errorMessage = deletedResult?.error || "Error desconocido";
          toast.error(`No se pudo eliminar la imagen: ${errorMessage}`);
        }
      } else {
        // Manejar fallos parciales o totales
        toast.error(`No se pudo eliminar la imagen: ${response.message}`);
      }
    } catch (error) {
      toast.error("Error al eliminar la imagen.");
      console.error(error);
    }
  };

  const handleUpdateImage = async (type) => {
    const file = imageFiles[type];
    if (!file) {
      toast.error("Selecciona una imagen para subir");
      return;
    }

    const newUrl = await uploadImage(file, type);
    if (newUrl) {
      const updatedUrls = {
        ...imageUrls,
        [type]: newUrl,
      };
      setImageUrls(updatedUrls);
      toast.success(
        `Ahora presione Actualizar Perfil para que el cambio se haga efectivo`
      );
      onImageUrlsChange(updatedUrls);
    }
  };

  const getPublicIdFromUrl = (url) => {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) {
      console.error('La URL no contiene "upload":', url);
      return "";
    }

    let publicIdParts = parts.slice(uploadIndex + 1);

    if (/^v\d+$/i.test(publicIdParts[0])) {
      publicIdParts = publicIdParts.slice(1);
    }

    const publicIdWithExtension = publicIdParts.join("/");
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");
    return publicId;
  };

  return (
    <>
      <Alert variant="info" className="mb-4">
        Nota: Por el momento solo estamos aceptando imágenes en formato WebP y
        tamaño máximo de 300 KB. Jobkler está en modo de prueba y no se
        aceptarán imágenes que no cumplan con estos requisitos. Puede utilizar
        un convertidor de imágenes en línea para convertir sus imágenes a
        formato WebP. Esperamos que esto no cause inconvenientes y agradecemos
        su comprensión.
      </Alert>

      {/* Alert para recordar al usuario actualizar el perfil */}
      {showUpdateProfileAlert && (
        <Alert
          variant="warning"
          onClose={() => setShowUpdateProfileAlert(false)}
          dismissible
          className="mb-4"
        >
          No olvides dar click en "Actualizar Perfil" o tus fotos no se
          actualizarán.
        </Alert>
      )}

      <div>
        <Form.Label className="h3">Administrar Imágenes</Form.Label>
        <Row>
          {[
            { type: "profileImage", label: "Imagen de Perfil" },
            { type: "certificate", label: "Certificado" },
            { type: "portfolio1", label: "Portafolio 1" },
            { type: "portfolio2", label: "Portafolio 2" },
            { type: "portfolio3", label: "Portafolio 3" },
          ].map(({ type, label }) => (
            <Col md={6} key={type}>
              <Form.Group className="mb-3">
                <Form.Label className={styles.label}>{label}</Form.Label>
                {imageUrls[type] ? (
                  <>
                    <Form.Control
                      type="text"
                      readOnly
                      value={imageUrls[type] || ""}
                      className={styles.inputField}
                    />
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteImage(type)}
                      className="mt-2"
                      type="button"
                    >
                      Borrar Imagen
                    </Button>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/webp"
                      onChange={(e) => handleFileChange(e, type)}
                      className={`form-control ${styles.inputField}`}
                    />
                    <Button
                      variant="primary"
                      onClick={() => handleUpdateImage(type)}
                      className="mt-2"
                      type="button"
                    >
                      Subir Imagen
                    </Button>
                  </>
                )}
              </Form.Group>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default ImagesUpdateForm;
