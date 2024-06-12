import Dialog from "@mui/material/Dialog";
import { Button } from "semantic-ui-react";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Form,
} from "semantic-ui-react";
import React, { useState } from "react";
import { useFormik } from "formik";
import { centosDirectory } from "@/api";
import {
  initialValues,
  validationSchema,
} from "@/layouts/LabsLayout/formsActivity/activityForm.form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const cDirectory = new centosDirectory();

export function Dialogmonitoractividad({
  openDialogMntorActividad,
  handleCloseDialogMntorActividad,
  lab,
  startMonitor,
  setOpenDialogMntorActividad,
  setShowButtonStopMntor,
  selectedLab,
  setIsConfirmOpen,
}) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      await cDirectory
        .createFile({ lab: lab, actividad: formValue.actividad })
        .then((response) => {
          if (response.status == 200) {
            startMonitor(lab);
            setShowButtonStopMntor(true);
            setOpenDialogMntorActividad(false);
            setIsConfirmOpen(true);
          }
        });
    },
  });

  return (
    <Dialog
      open={openDialogMntorActividad}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialogMntorActividad}
      aria-describedby="alert-dialog-slide-description"
    >
      <Form onSubmit={formik.handleSubmit}>
        <DialogContent>
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
            Para empezar la monitorización en el laboratorio {selectedLab} {""}
            ingresa la actividad
          </p>
        </DialogContent>

        <DialogActions className="mb-4 mr-4">
          <Button type="submit" loading={formik.isSubmitting}>
            Monitorear
          </Button>
          <Button
            type="button"
            className="big ui basic button border"
            onClick={handleCloseDialogMntorActividad}
          >
            Salir
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
