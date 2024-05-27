import { Dialog } from "@mui/material";
import React from "react";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Form } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import Datepicker from "react-tailwindcss-datepicker";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "@/layouts/LabsLayout/formsActivity/activityForm.form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Dialogprogramacion({
  openDialogProg,
  handleCloseDialogProg,
  selectedLab,
  lab,
  valueDateP,
  setValueDateP,
}) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      await cDirectory
        .createFile({ lab: lab, actividad: formValue.actividad })
        .then((response) => {
          if ((response = 200)) {
            startMonitor(lab);
            setShowButtonStopMntor(true);
            setOpenDialogMntor(false);
          }
        });
    },
  });

  return (
    <Dialog
      open={openDialogProg}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialogProg}
      aria-describedby="alert-dialog-slide-description"
    >
      <Form onSubmit={formik.handleSubmit}>
        <DialogContent className="h-[42rem] w-[42rem]">
          <div className="py-6 text-xl flex items-center justify-center">
            {" "}
            <p>
              Programación de monitoreo {""}
              <b>{lab}</b>
            </p>
          </div>
          <div className="flex justify-start pb-2"> Fecha</div>

          <Datepicker
            placeholder={"Fecha programación"}
            containerClassName=""
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

          <div className="pt-16">
            <label
              for="start-time"
              class="block mb-2 font-medium text-gray-900 dark:text-white"
            >
              Hora Inicio
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="start-time"
                class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00"
                max="18:00"
                value="00:00"
                required
              />
            </div>
          </div>
          <div className="pt-16">
            <label
              for="end-time"
              class="block mb-2 font-medium text-gray-900 dark:text-white"
            >
              Hora Término
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="end-time"
                class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00"
                max="18:00"
                value="00:00"
                required
              />
            </div>
          </div>

          <div className="w-[38rem] pt-16">
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
        </DialogContent>

        <DialogActions className="mb-4 mr-4">
          <Button type="submit" loading={formik.isSubmitting}>
            Programar monitoreo
          </Button>
          <Button
            type="button"
            className="big ui basic button border"
            onClick={handleCloseDialogProg}
          >
            Salir
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
