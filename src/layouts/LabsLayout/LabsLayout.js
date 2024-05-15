import { Button } from "semantic-ui-react";
import styles from "./LabsLayout.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { centosDirectory } from "@/api";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { AutocompleteFecha } from "@/components/Buttons/autocomplete/fechas";
import { AutocompletePcs } from "@/components/Buttons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function LabsLayout({ lab }) {
  const { accessToken, startMonitor, stopMonitor } = useAuth();
  const router = useRouter();
  const [openDialogMntor, setOpenDialogMntor] = React.useState(false);
  const [showButtonStopMntor, setShowButtonStopMntor] = React.useState(false);

  //para las fechas
  const [openFechas, setOpenFechas] = React.useState(false);
  const [valueFecha, setValueFecha] = React.useState(null);
  const [inputValueFecha, setInputValueFecha] = React.useState("");

  //para los computadores
  const [openPcs, setOpenPcs] = React.useState(false);
  const [valuePcs, setValuePcs] = React.useState(null);
  const [inputValuePcs, setInputValuePcs] = React.useState("");

  var ismonitoring = localStorage.getItem("Ismonitoring");
  var labmonitoring = localStorage.getItem("Labmonitoring");
  var selectedLab = localStorage.getItem("selectedLabs");

  React.useEffect(() => {
    const showButtomStop = ismonitoring && labmonitoring === selectedLab;
    setShowButtonStopMntor(showButtomStop);
  }, [selectedLab]);

  const cDirectory = new centosDirectory();

  const handleOpenDialogMntor = () => {
    setOpenDialogMntor(true);
  };

  const handleCloseDialogMntor = () => {
    setOpenDialogMntor(false);
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
    setShowButtonStopMntor(false);
  };

  if (!accessToken) {
    router.push("/");
    return null;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className={styles.topBar}>
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
            {/* <Autocomplete
              id="asynchronous-demo"
              value={valueFecha || null}
              onChange={(event, newValue) => {
                setValueFecha(newValue);
              }}
              inputValue={inputValueFecha}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              sx={{
                width: 200,
                marginRight: 2,
              }}
              open={openFechas}
              onOpen={() => {
                setOpenFechas(true);
              }}
              onClose={() => {
                setOpenFechas(false);
              }}
              getOptionLabel={(option) => option.nombre}
              options={fechas}
              loading={loadingFechas}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Fechas"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loadingFechas ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            /> */}

            <Button onClick={handleOpenDialogMntor}>Monitorear</Button>
            <Dialog
              open={openDialogMntor}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialogMntor}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Comenzará la monitorización en el laboratorio {lab}, estás
                  seguro?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogMntor}>Salir</Button>
                <Button onClick={handleClickMonitor}>Monitorear</Button>
              </DialogActions>
            </Dialog>
            {showButtonStopMntor ? (
              <Button onClick={handleClickSMonitor}>Detener Monitoreo</Button>
            ) : null}
          </div>
        </div>

        <div className={styles.block}>{lab}</div>
      </div>
    </>
  );
}
