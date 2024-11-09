import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  phone: Yup.string().required("El teléfono es obligatorio"),
  surname: Yup.string().required("El apellido es obligatorio"),
  profession: Yup.string().required("La profesión es obligatoria"),
  location: Yup.string().required("La ubicación es obligatoria"),
  about: Yup.string().required('El campo "Sobre mí" es obligatorio'),
  description: Yup.string().required("La descripción es obligatoria"),
  header: Yup.string().required("La imagen de perfil es obligatoria"),
  certificate: Yup.string().required("La imagen de certificado es obligatoria"),
  portfolio1: Yup.string().required("La imagen de portafolio 1 es obligatoria"),
  portfolio2: Yup.string().required("La imagen de portafolio 2 es obligatoria"),
  portfolio3: Yup.string().required("La imagen de portafolio 3 es obligatoria"),
});

export default validationSchema;
