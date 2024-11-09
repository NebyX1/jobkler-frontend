import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  surname: Yup.string().required("El apellido es obligatorio"),
  profession: Yup.string().required("La profesión es obligatoria"),
  location: Yup.string().required("La ubicación es obligatoria"),
  about: Yup.string().required('El campo "Sobre mí" es obligatorio'),
  description: Yup.string().required("La descripción es obligatoria"),
});

export default validationSchema;
