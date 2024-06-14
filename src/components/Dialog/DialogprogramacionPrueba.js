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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const cDirectory = new centosDirectory();

export function Dialogprogramacionprueba({
  OpenDialogProgPrueba,
  handleCloseDialogProgPrueba,
  lab,
  valueDateP,
  setValueDateP,
  setOpenDialogProg,
  setIsConfirmOpen,
  setOpenDialogProgPrueba,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    "Discord",
    "Steam",
    "Whatsapp",
    "OperaGX",
    "Bing",
    "Teams",
    "Mozilla Firefox",
  ];
  const [valueTimerInic, setValueTimerInic] = React.useState(dayjs(""));
  const [valueTimerFin, setValueTimerFin] = React.useState(dayjs(""));

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

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const infoArch =
        valueDateP.startDate +
        "," +
        valueTimerInic.hour() +
        ":" +
        valueTimerInic.minute() +
        "," +
        valueTimerFin.hour() +
        ":" +
        valueTimerFin.minute() +
        "," +
        formValue.actividad;

      await cDirectory
        .createFileProg({ lab: lab, content: infoArch })
        .then((response) => {
          if (response.status == 200) {
            setOpenDialogProgPrueba(false);
            setOpenDialogProg(false);
            setIsConfirmOpen(true);
          }
        });
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
            <p>
              Programación de <b>Evaluación</b> en {""}
              <b>{lab}</b>
            </p>
          </div>
          <div className="flex justify-start pb-2"> Fecha</div>

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
            <div className=" flex justify-start pb-2">Hora Inicio</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={valueTimerInic}
                onChange={(newValue) => setValueTimerInic(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="pt-8 ">
            <div className=" flex justify-start pb-2">Hora Término</div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={valueTimerFin}
                onChange={(newValue) => setValueTimerFin(newValue)}
              />
            </LocalizationProvider>
          </div>

          <div className="pt-8">
            <div className=" flex justify-start pb-2"> Actividad</div>
            <Form.Input
              name="actividad"
              type="text"
              placeholder="Actividad"
              value={formik.values.actividad}
              onChange={formik.handleChange}
              error={formik.errors.actividad}
            />
          </div>

          <div className="pt-8">
            <div className=" flex justify-start ">Webs no permitidas</div>
          </div>
          <FormTextArea
            className="pt-2"
            placeholder="webs sin acceso en la actividad (ej: www.nombrepagina.com) Usa el punto y coma (;) para separar las entradas"
          />

          <div className="pt-4 ">
            <div className=" flex justify-start pb-2">
              Aplicaciones no permitidas
            </div>
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
