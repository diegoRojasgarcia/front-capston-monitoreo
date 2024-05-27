import * as Yup from "yup";

export function initialValues() {
  return {
    actividad: "",
  };
}

export function validationSchema() {
  return Yup.object({
    actividad: Yup.string().required(true),
  });
}
