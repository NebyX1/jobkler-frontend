import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validationSchema";
import styles from "@/styles/createprofile.module.css";
import { useUserInfo } from "@/api/hooks/getUserInfo";
import ImagesUpdateForm from "./ImagesUpdateForm";
import MarkdownIt from 'markdown-it';
import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

// Deshabilitar plugins de imagen y enlace si es necesario
MdEditor.unuse(Plugins.Image);
MdEditor.unuse(Plugins.Link);

const mdParser = new MarkdownIt();

const UpdateProfileForm = ({ onSubmit, userProfile, professions, locations }) => {
  const { data: userInfo } = useUserInfo();
  const userId = userInfo?.id;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [imageUrls, setImageUrls] = useState({
    header: "",
    certificate: "",
    portfolio1: "",
    portfolio2: "",
    portfolio3: "",
  });

  // Actualizar los valores del formulario cuando userProfile cambie
  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile?.name || "",
        surname: userProfile?.surname || "",
        profession: userProfile?.profession || "",
        location: userProfile?.location || "",
        about: userProfile?.about || "",
        description: userProfile?.description || "",
      });
      setImageUrls({
        header: userProfile?.header || "",
        certificate: userProfile?.certificate || "",
        portfolio1: userProfile?.portfolio1 || "",
        portfolio2: userProfile?.portfolio2 || "",
        portfolio3: userProfile?.portfolio3 || "",
      });
    }
  }, [userProfile]);

  // Función para manejar la actualización de las URLs de imágenes desde el componente hijo
  const handleImageUrlsChange = (updatedUrls) => {
    setImageUrls({
      header: updatedUrls.profileImage || "",
      certificate: updatedUrls.certificate || "",
      portfolio1: updatedUrls.portfolio1 || "",
      portfolio2: updatedUrls.portfolio2 || "",
      portfolio3: updatedUrls.portfolio3 || "",
    });
  };

  const handleFormSubmit = (data) => {
    // Combinar los datos del formulario con las URLs de las imágenes
    const updatedData = {
      ...data,
      header: imageUrls.header || null,
      certificate: imageUrls.certificate || null,
      portfolio1: imageUrls.portfolio1 || null,
      portfolio2: imageUrls.portfolio2 || null,
      portfolio3: imageUrls.portfolio3 || null,
    };

    onSubmit(updatedData);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          {/* Nombre */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>Nombre</Form.Label>
              <Form.Control
                type="text"
                {...register("name")}
                className={`${styles.inputField} ${
                  errors.name ? styles.inputError : ""
                }`}
                placeholder="Tu nombre"
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
                className={`${styles.inputField} ${
                  errors.surname ? styles.inputError : ""
                }`}
                placeholder="Tu apellido"
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
                    style={{ height: '200px' }}
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
                      shortcuts: {
                        bold: true,
                        italic: true,
                        strikethrough: true,
                        unorderedList: true,
                        orderedList: true,
                        blockquote: true,
                        codeBlock: true,
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
                    style={{ height: '200px' }}
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
                      shortcuts: {
                        bold: true,
                        italic: true,
                        strikethrough: true,
                        unorderedList: true,
                        orderedList: true,
                        blockquote: true,
                        codeBlock: true,
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
        </Row>

        {/* Componente para la gestión de imágenes */}
        <ImagesUpdateForm
          userId={userId}
          userProfile={userProfile}
          onImageUrlsChange={handleImageUrlsChange}
        />

        <div className="text-center mt-4">
          <Button type="submit" className={styles.submitButton}>
            Actualizar Perfil
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UpdateProfileForm;