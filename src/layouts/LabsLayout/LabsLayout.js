import { Button } from "semantic-ui-react";
import styles from "./LabsLayout.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { centosDirectory } from "@/api";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import Slide from "@mui/material/Slide";
import { AutocompleteFecha, AutocompletePcs } from "@/components/Buttons";
import {
  initialValues,
  validationSchema,
} from "./formsActivity/activityForm.form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const cDirectory = new centosDirectory();

export function LabsLayout({ lab }) {
  const { user, startMonitor, stopMonitor } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      cDirectory
        .createFile({ lab: lab, actividad: formValue.actividad })
        .then((response) => {
          startMonitor(lab);
          setShowButtonStopMntor(true);
          setOpenDialogMntor(false);
          console.log("archivo enviado");
        });
    },
  });

  //datepicker
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const [selectedDate, setSelectedDate] = useState(null);

  var selectedLab = localStorage.getItem("selectedLabs");

  const [openDialogMntor, setOpenDialogMntor] = React.useState(false);
  const [existFile, setExistFile] = React.useState(false);
  const [showButtonStopMntor, setShowButtonStopMntor] = React.useState(false);

  const [openDialogStopMntor, setOpenDialogStopMntor] = React.useState(false);

  //para las fechas
  const [openFechas, setOpenFechas] = React.useState(false);
  const [valueFecha, setValueFecha] = React.useState(null);
  const [inputValueFecha, setInputValueFecha] = React.useState("");

  //para los computadores
  const [openPcs, setOpenPcs] = React.useState(false);
  const [valuePcs, setValuePcs] = React.useState(null);
  const [inputValuePcs, setInputValuePcs] = React.useState("");

  React.useEffect(() => {
    try {
      cDirectory.existFile({ lab: selectedLab }).then((response) => {
        setExistFile(response.exist);
        setShowButtonStopMntor(response.exist);
      });
    } catch (error) {
      console.error(error);
    }
    let showButtomStop = existFile;
    setShowButtonStopMntor(showButtomStop);
  }, [lab]);

  const handleOpenDialogMntor = () => {
    setOpenDialogMntor(true);
  };

  const handleCloseDialogMntor = () => {
    setOpenDialogMntor(false);
  };

  const handleOpenDialogStopMntor = () => {
    setOpenDialogStopMntor(true);
  };

  const handleCloseDialogStopMntor = () => {
    setOpenDialogStopMntor(false);
  };

  //open dialog
  const handleClickMonitor = () => {
    cDirectory.createFile({ lab: lab }).then((response) => {
      console.log("archivo enviado");
    });
    startMonitor(lab);
    setShowButtonStopMntor(true);
    setOpenDialogMntor(false);
  };

  const handleClickSMonitor = () => {
    cDirectory.deleteFile({ lab: lab }).then((response) => {
      console.log("archivo eliminado");
    });
    stopMonitor();
    setOpenDialogStopMntor(false);
    setShowButtonStopMntor(false);
  };

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className={styles.topBar}>
          <div className={styles.blockleft}>
            <div className="flex inline-flexbox">
              <AutocompleteFecha
                openFechas={openFechas}
                setOpenFechas={setOpenFechas}
                valueFecha={valueFecha}
                inputValue={inputValueFecha}
                setValueFecha={setValueFecha}
                setInputValueFecha={setInputValueFecha}
              />
              <AutocompletePcs
                openPcs={openPcs}
                setOpenPcs={setOpenPcs}
                valuePcs={valuePcs}
                inputValue={inputValuePcs}
                setValuePcs={setValuePcs}
                setInputValuePcs={setInputValuePcs}
                valueFecha={valueFecha}
              />
              {/* <Datepicker
                primaryColor={"orange"}
                value={value}
                asSingle={true}
                useRange={false}
                displayFormat={"DD/MM/YYYY"}
                onChange={(date) => setSelectedDate(date)}
                includeDates={"2024-05-17"}
              />{" "} */}
            </div>
          </div>

          <div className={styles.blockRight}>
            <div className="flex inline-flexbox">
              {showButtonStopMntor ? (
                <Button
                  basic
                  color="orange"
                  onClick={handleOpenDialogStopMntor}
                >
                  Detener Monitoreo
                </Button>
              ) : (
                <>
                  <Button onClick={handleOpenDialogMntor}>Monitorear</Button>
                </>
              )}
              <Button>Programar Monitoreo</Button>
            </div>
            <Dialog
              open={openDialogMntor}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialogMntor}
              aria-describedby="alert-dialog-slide-description"
            >
              <Form onSubmit={formik.handleSubmit}>
                <DialogContent>
                  <div className="w-[38rem] pt-2">
                    <Form.Input
                      name="actividad"
                      type="text"
                      placeholder="Actividad"
                      value={formik.values.actividad}
                      onChange={formik.handleChange}
                      error={formik.errors.actividad}
                    />
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
                      Para empezar la monitorización en el laboratorio{" "}
                      <b>{selectedLab}</b>
                      ingresa la actividad
                    </p>
                  </div>
                </DialogContent>
                <DialogActions className="mb-4 mr-4">
                  <Button type="submit" loading={formik.isSubmitting}>
                    Monitorear
                  </Button>
                  <Button className="h-12" onClick={handleCloseDialogMntor}>
                    Salir
                  </Button>
                </DialogActions>
              </Form>
            </Dialog>

            <Dialog
              open={openDialogStopMntor}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialogStopMntor}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogContent>
                <div className="w-[38rem] pt-2">
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
                    Se detendrá la monitorización en el laboratorio{" "}
                    <b>{selectedLab}</b>, estás seguro?
                  </p>
                </div>
              </DialogContent>
              <DialogActions className="mb-4 mr-3">
                <Button onClick={handleCloseDialogStopMntor}>No</Button>
                <Button onClick={handleClickSMonitor}>Si</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>

        <div className={styles.block}></div>
      </div>
    </>
  );
}
