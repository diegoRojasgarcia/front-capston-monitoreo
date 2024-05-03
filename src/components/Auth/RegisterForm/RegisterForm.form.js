import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    nombre: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email(true).required(true),
    nombre: Yup.string().required(true),
    password: Yup.string().required(true),
  });
}
