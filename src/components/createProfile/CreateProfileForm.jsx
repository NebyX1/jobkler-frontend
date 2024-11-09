import React, { useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validationSchema";
import useUploadToCloudinary from "./useUploadToCloudinary";
import styles from "@/styles/createprofile.module.css";
import { toast } from "react-hot-toast";
import MarkdownIt from "markdown-it";
import MdEditor, { Plugins } from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

// Deshabilitar plugins innecesarios si es necesario
MdEditor.unuse(Plugins.Image);
MdEditor.unuse(Plugins.Link);

const mdParser = new MarkdownIt();

const CreateProfileForm = ({ onSubmit, professions, locations, userId }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [imageFiles, setImageFiles] = useState({});
  const [imageUrls, setImageUrls] = useState({
    header: "",
    certificate: "",
    portfolio1: "",
    portfolio2: "",
    portfolio3: "",
  });

  // Pasamos userId al hook
  const { uploadImage } = useUploadToCloudinary(userId);

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    setImageFiles((prev) => ({ ...prev, [type]: file }));

    if (file) {
      const url = await uploadImage(file, type);
      if (url) {
        setImageUrls((prev) => ({ ...prev, [type]: url }));
        setValue(type, url);
      } else {
        toast.error(
          `Error al subir la imagen de ${type}. Asegúrate de que cumple con los requisitos.`
        );
      }
    }
  };

  const handleFormSubmit = (data) => {
    const allImagesUploaded = Object.values(imageUrls).every((url) => url);
    if (!allImagesUploaded) {
      toast.error(
        "Por favor, sube todas las imágenes antes de enviar el formulario."
      );
      return;
    }

    const profileData = { ...data, ...imageUrls };
    onSubmit(profileData);
  };

  // Mapeo de tipos a etiquetas en español
  const labelMap = {
    header: "Imagen de Perfil",
    certificate: "Certificado",
    portfolio1: "Imagen de Portfolio 1",
    portfolio2: "Imagen de Portfolio 2",
    portfolio3: "Imagen de Portfolio 3",
  };

  return (
    <>
      <Alert variant="info" className="mb-4">
        <strong>Nota:</strong> Jobkler está en modo de prueba. Solo aceptamos
        imágenes en formato WebP y tamaño máximo de 300 KB. Puede utilizar un
        convertidor de imágenes en línea para convertir sus imágenes a formato
        WebP. Esperamos que esto no cause inconvenientes y agradecemos su
        comprensión.
        <br />
        Además, algunas profesiones u oficios podrían no estar incluidas aún. Si
        ese es el caso, por favor comuníquese al correo{" "}
        <a href="mailto:contacto@jobkler.com">contacto@jobkler.com</a> y
        agregaremos la profesión a la lista a la brevedad.
      </Alert>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          {/* Nombre */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Nombre</Form.Label>
              <Form.Control
                type="text"
                {...register("name")}
                placeholder="Tu nombre"
                className={`${styles.inputField} ${
                  errors.name ? styles.inputError : ""
                }`}
              />
              {errors.name && (
                <p className={styles.errorText}>{errors.name.message}</p>
              )}
            </Form.Group>
          </Col>

          {/* Apellido */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Apellido</Form.Label>
              <Form.Control
                type="text"
                {...register("surname")}
                placeholder="Tu apellido"
                className={`${styles.inputField} ${
                  errors.surname ? styles.inputError : ""
                }`}
              />
              {errors.surname && (
                <p className={styles.errorText}>{errors.surname.message}</p>
              )}
            </Form.Group>
          </Col>

          {/* Profesión */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Profesión</Form.Label>
              <Form.Select
                {...register("profession")}
                className={`${styles.inputField} ${
                  errors.profession ? styles.inputError : ""
                }`}
              >
                <option value="" disabled>
                  Selecciona una profesión
                </option>
                {professions.map((profession) => (
                  <option key={profession.id} value={profession.id}>
                    {profession.name
                      .replace(/_/g, " ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </option>
                ))}
              </Form.Select>
              {errors.profession && (
                <p className={styles.errorText}>{errors.profession.message}</p>
              )}
            </Form.Group>
          </Col>

          {/* Ubicación */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Ubicación</Form.Label>
              <Form.Select
                {...register("location")}
                className={`${styles.inputField} ${
                  errors.location ? styles.inputError : ""
                }`}
              >
                <option value="" disabled>
                  Selecciona una ubicación
                </option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name
                      .replace(/_/g, " ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </option>
                ))}
              </Form.Select>
              {errors.location && (
                <p className={styles.errorText}>{errors.location.message}</p>
              )}
            </Form.Group>
          </Col>

          {/* Teléfono */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Teléfono</Form.Label>
              <Form.Control
                type="text"
                {...register("phone")}
                placeholder="Tu teléfono"
                className={`${styles.inputField} ${
                  errors.phone ? styles.inputError : ""
                }`}
              />
              {errors.phone && (
                <p className={styles.errorText}>{errors.phone.message}</p>
              )}
            </Form.Group>
          </Col>

          {/* Sobre mí (Editor Markdown) */}
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Sobre mí</Form.Label>
              <Controller
                control={control}
                name="about"
                defaultValue=""
                render={({ field }) => (
                  <MdEditor
                    {...field}
                    style={{ height: "200px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={({ text }) => field.onChange(text)}
                    value={field.value}
                    config={{
                      view: {
                        menu: true,
                        md: true,
                        html: false,
                      },
                      canView: {
                        fullScreen: false,
                        hideMenu: true,
                        both: false,
                        preview: false,
                      },
                    }}
                  />
                )}
              />
              {errors.about && (
                <p className={styles.errorText}>{errors.about.message}</p>
              )}
            </Form.Group>
          </Col>

          {/* Descripción (Editor Markdown) */}
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Descripción</Form.Label>
              <Controller
                control={control}
                name="description"
                defaultValue=""
                render={({ field }) => (
                  <MdEditor
                    {...field}
                    style={{ height: "200px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={({ text }) => field.onChange(text)}
                    value={field.value}
                    config={{
                      view: {
                        menu: true,
                        md: true,
                        html: false,
                      },
                      canView: {
                        fullScreen: false,
                        hideMenu: true,
                        both: false,
                        preview: false,
                      },
                    }}
                  />
                )}
              />
              {errors.description && (
                <p className={styles.errorText}>{errors.description.message}</p>
              )}
            </Form.Group>
          </Col>

          {/* Campos de carga de imágenes */}
          {[
            "header",
            "certificate",
            "portfolio1",
            "portfolio2",
            "portfolio3",
          ].map((type, idx) => (
            <Col md={6} key={idx}>
              <Form.Group className="mb-3">
                <Form.Label className={styles.label}>
                  {labelMap[type]}
                </Form.Label>
                <input
                  type="file"
                  accept="image/webp"
                  onChange={(e) => handleFileChange(e, type)}
                  className={`form-control ${styles.inputField}`}
                />
                {errors[type] && (
                  <p className={styles.errorText}>{errors[type].message}</p>
                )}
              </Form.Group>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <Button type="submit" className={styles.submitButton}>
            Crear Perfil
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateProfileForm;
