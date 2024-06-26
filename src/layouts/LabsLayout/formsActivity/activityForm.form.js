import * as Yup from "yup";

export function initialValues() {
  return {
    actividad: "",
  };
}

export function validationSchema() {
  return Yup.object({
    actividad: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras y espacios")
      .required(true),
  });
}
