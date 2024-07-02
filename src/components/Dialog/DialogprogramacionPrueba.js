import { Dialog } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Form, FormTextArea } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import Datepicker from "react-tailwindcss-datepicker";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  initialValues,
  validationSchema,
} from "@/layouts/LabsLayout/formsFecha/programacionForm.form";
import { TimePicker } from "@mui/x-date-pickers";
import { centosDirectory } from "@/api";
import { useAuth } from "@/hooks";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const cDirectory = new centosDirectory();

export function Dialogprogramacionprueba({
  OpenDialogProgPrueba,
  handleCloseDialogProgPrueba,
  selectedLabNombre,
  selectedLabDN,
  valueDateP,
  setValueDateP,
  setOpenDialogProg,
  setIsConfirmOpen,
  setOpenDialogProgPrueba,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["Discord", "Steam", "Whatsapp", "Skype", "Bing", "Teams"];
  const [valueTimerInic, setValueTimerInic] = React.useState(dayjs(""));
  const [valueTimerFin, setValueTimerFin] = React.useState(dayjs(""));
  const { user } = useAuth();

  const [textformwebs, setText] = useState("");

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSelectAllChange = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const domainList = textformwebs.split(";");
      console.log(domainList);
      console.log(selectedOptions);
      const respA = await cDirectory.createA({
        aplicaciones: selectedOptions,
      });
      const respW = await cDirectory.createW({
        websites: domainList,
      });
      const horainicio = valueTimerInic.hour() + ":" + valueTimerInic.minute();
      const horafin = valueTimerFin.hour() + ":" + valueTimerFin.minute();

      await cDirectory
        .createProgramacion({
          actividad: formValue.actividad,
          laboratorio: selectedLabNombre,
          email: user.email,
          fecha: valueDateP.startDate,
          horainicio: horainicio,
          horafin: horafin,
          a: respA.aplicaciones.id,
          w: respW.websites.id,
        })
        .then((response) => {
          if (response.status == 200) {
            setOpenDialogProgPrueba(false);
            setOpenDialogProg(false);
            setIsConfirmOpen(true);
          }
        });

      //   valueDateP.startDate +
      //   "," +
      //   valueTimerInic.hour() +
      //   ":" +
      //   valueTimerInic.minute() +
      //   "," +
      //   valueTimerFin.hour() +
      //   ":" +
      //   valueTimerFin.minute() +
      //   "," +
      //   formValue.actividad;
      // const webs = textformwebs;
      // const apps = selectedOptions;
      // await cDirectory.createFiles({
      //   lab: selectedLabNombre,
      //   filename: "w",
      //   content: webs,
      // });
      // await cDirectory.createFiles({
      //   lab: selectedLabNombre,
      //   filename: "a",
      //   content: apps.join(";"),
      // });
      // await cDirectory.createFiles({
      //   lab: selectedLabNombre,
      //   filename: "i",
      //   content: user.email,
      // });
      // await cDirectory
      //   .createFileProg({ lab: selectedLabNombre, content: infoArch })
      //   .then((response) => {
      //     if (response.status == 200) {
      //       setOpenDialogProgPrueba(false);
      //       setOpenDialogProg(false);
      //       setIsConfirmOpen(true);
      //     }
      //   });
    },
  });

  return (
    <Dialog
      open={OpenDialogProgPrueba}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialogProgPrueba}
      aria-describedby="alert-dialog-slide-description"
    >
      <Form onSubmit={formik.handleSubmit}>
        <DialogContent className="lg:w-[34rem]">
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

          <div className="pt-2 mb-8">
            <Form.Input
              name="actividad"
              type="text"
              placeholder="Actividad"
              value={formik.values.actividad}
              onChange={formik.handleChange}
              error={formik.errors.actividad}
            />
          </div>

          <h1 className="text-lg mb-2">Fecha</h1>

          <Datepicker
            placeholder={"Fecha programación (dd/mm/aaa)"}
            minDate={new Date(Date.now())}
            inputClassName="border-4 border-black hover:border-orange-400 rounded-lg py-3.5 h-22"
            primaryColor={"amber"}
            toggleClassName="absolute bg-orange-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            displayFormat={"DD/MM/YYYY"}
            showShortcuts={true}
            showFooter={true}
            asSingle={true}
            useRange={false}
            value={valueDateP}
            onChange={setValueDateP}
          />

          <div className="pt-8 ">
            <h1 className="text-lg mb-2">Hora Inicio</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={valueTimerInic}
                sx={{}}
                onChange={(newValue) => setValueTimerInic(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="pt-8 ">
            <h1 className="text-lg mb-2">Hora Término</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={valueTimerFin}
                onChange={(newValue) => setValueTimerFin(newValue)}
              />
            </LocalizationProvider>
          </div>

          <div className="pt-8 mb-2">
            <h1 className="text-lg ">Webs no permitidas</h1>
          </div>
          <FormTextArea
            className="pt-2"
            value={textformwebs}
            onChange={handleChange}
            placeholder="webs sin acceso en la actividad (ej: www.nombrepagina.com) Usa el punto y coma (;) para separar las entradas"
          />

          <div className="pt-4">
            <h1 className="text-lg mb-2">Aplicaciones no permitidas</h1>
            <div className="mb-4 pt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={selectedOptions.length === options.length}
                  onChange={handleSelectAllChange}
                />
                <span className="ml-2">Seleccionar todas</span>
              </label>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {options.map((option) => (
                <div key={option} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
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
            Programar monitoreo
          </Button>
          <Button
            type="button"
            className="big ui basic button border"
            onClick={handleCloseDialogProgPrueba}
          >
            Salir
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
