import Dialog from "@mui/material/Dialog";
import { Button } from "semantic-ui-react";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { FormTextArea, Form } from "semantic-ui-react";
import React, { useState } from "react";
import { useFormik } from "formik";
import { centosDirectory } from "@/api";
import {
  initialValues,
  validationSchema,
} from "@/layouts/LabsLayout/formsActivity/activityForm.form";
import { useAuth } from "@/hooks";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const cDirectory = new centosDirectory();

export function Dialogmonitorprueba({
  openDialogMntorPrueba,
  handleCloseDialogMntorPrueba,
  setShowButtonStopMntor,
  setOpenDialogMntorPrueba,
  selectedLabNombre,
  selectedLabDN,
  setIsConfirmOpen,
}) {
  const { user } = useAuth();
  const [textformwebs, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [durationHours, setDurationHours] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [aplicaciones, setAplicaciones] = useState([]);

  React.useEffect(() => {
    cDirectory.getAplicaciones().then((response) => {
      setAplicaciones(response);
    });
  }, [openDialogMntorPrueba]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const webs = textformwebs;
      const apps = selectedOptions;
      await cDirectory.createDuracion({
        laboratorio: selectedLabNombre,
        actividad: formValue.actividad,
        horas: durationHours,
        minutos: durationMinutes,
      });
      await cDirectory.createFiles({
        lab: selectedLabNombre,
        filename: "w",
        content: webs,
      });
      await cDirectory.createFiles({
        lab: selectedLabNombre,
        filename: "a",
        content: apps.join(";"),
      });
      await cDirectory.createFiles({
        lab: selectedLabNombre,
        filename: "i",
        content: user.email,
      });
      await cDirectory
        .createFiles({
          lab: selectedLabNombre,
          filename: "c",
          content: formValue.actividad,
        })
        .then((response) => {
          if (response.status == 200) {
            setShowButtonStopMntor(true);
            setOpenDialogMntorPrueba(false);
            setIsConfirmOpen(true);
          }
        });
    },
  });

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSelectAllChange = () => {
    if (selectedOptions.length === aplicaciones.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(aplicaciones);
    }
  };

  const handleDurationHoursChange = (event) => {
    const value = event.target.value;
    if (isNaN(value) || value < 0) {
      alert("Por favor, ingrese un número válido.");
      return;
    }
    setDurationHours(value);
  };

  const handleDurationMinutesChange = (event) => {
    let value = event.target.value;
    if (isNaN(value) || value < 0 || value > 59) {
      alert("Por favor, ingrese un número válido entre 0 y 59.");
      return;
    }
    if (value.length === 1) {
      value = "0" + value;
    }
    setDurationMinutes(value);
  };

  return (
    <Dialog
      open={openDialogMntorPrueba}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialogMntorPrueba}
      aria-describedby="alert-dialog-slide-description"
    >
      <Form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <div className="py-6 text-xl flex items-center justify-center">
            {" "}
            {selectedLabDN ? (
              <p>
                Monitorización de <b>Evaluación</b> en {""}
                <b>{selectedLabDN}</b>
              </p>
            ) : (
              <p>
                Monitorización de <b>Evaluación</b> en {""}
                <b>{selectedLabNombre}</b>
              </p>
            )}
          </div>
          <div className="pt-2">
            <Form.Input
              name="actividad"
              type="text"
              placeholder="Actividad"
              value={formik.values.actividad}
              onChange={formik.handleChange}
              error={formik.errors.actividad}
            />
          </div>
          <div className="pt-2">
            <div className="flex items-center">
              <input
                type="number"
                value={durationHours}
                onChange={handleDurationHoursChange}
                className="border border-orange-500 p-1 w-[60px] mx-1"
                placeholder="Horas"
                min="0"
              />
              <span>:</span>
              <input
                type="number"
                value={durationMinutes}
                onChange={handleDurationMinutesChange}
                className="border border-orange-500 p-1 w-[60px] mx-1"
                placeholder="Minutos"
                min="0"
                max="59"
              />
            </div>
          </div>
          <div className="pt-6 ">
            <h1 className="text-lg mb-6">Aplicaciones no permitidas</h1>

            <div className="grid grid-cols-3 gap-4">
              {aplicaciones &&
                aplicaciones.map((aplicacion) => (
                  <div key={aplicacion.id} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={selectedOptions.includes(aplicacion.nombre)}
                        onChange={() => handleCheckboxChange(aplicacion.nombre)}
                      />
                      <span className="ml-2">{aplicacion.nombre}</span>
                    </label>
                  </div>
                ))}
            </div>
          </div>
          {/* <div>
            <h1 className="text-lg ">Webs no permitidas</h1>
          </div>
          <FormTextArea
            className="pt-4"
            value={textformwebs}
            onChange={handleChange}
            placeholder="webs sin acceso en la actividad (ej: www.nombrepagina.com) Usa el punto y coma (;) para separar las entradas"
          /> */}
          <p className="flex items-center justify-center gap-1 mt-3 font-sans text-l antialiased font-normal leading-normal text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 -mt-px"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              ></path>
            </svg>
            Para empezar la monitorización en el laboratorio ingresa la
            actividad
          </p>
        </DialogContent>

        <DialogActions className="mb-4 mr-4">
          <Button type="submit" loading={formik.isSubmitting}>
            Monitorear
          </Button>
          <Button
            type="button"
            className="big ui basic button border"
            onClick={handleCloseDialogMntorPrueba}
          >
            Salir
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
