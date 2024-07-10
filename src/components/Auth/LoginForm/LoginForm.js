import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Auth } from "@/api";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./LoginForm.form";
import { useState } from "react";
import { Alert } from "@material-tailwind/react";

const authCtrl = new Auth();

export function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authCtrl.login(formValue);
        if (response.token) {
          login(response.token);
        }
        setErrorMessage("Credenciales incorrectas");
      } catch (error) {
        console.log("error al iniciar sesion");
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        type="text"
        placeholder="Correo electrónico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Iniciar Sesión
      </Form.Button>

      {errorMessage && (
        <div
          class="bg-red-100 text-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Ups!</strong>
          <span class="block sm:inline"> {errorMessage}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
        </div>
      )}
    </Form>
  );
}
