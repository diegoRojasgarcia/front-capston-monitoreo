import { Button } from "semantic-ui-react";
import styles from "./LabsLayout.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React from "react";
import { centosDirectory } from "@/api";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { AutocompleteFecha } from "@/components/Buttons/autocomplete/fechas";
import { AutocompletePcs } from "@/components/Buttons";
import ReactPlayer from "react-player/lazy";
import video from ".";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const cDirectory = new centosDirectory();

export function LabsLayout({ lab }) {
  const { accessToken, user, startMonitor, stopMonitor } = useAuth();
  const router = useRouter();

  var ismonitoring = localStorage.getItem("Ismonitoring");
  var labmonitoring = localStorage.getItem("Labmonitoring");
  var selectedLab = localStorage.getItem("selectedLabs");

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

  React.useEffect(() => {
    let showButtomStop = ismonitoring && labmonitoring === selectedLab;
    setShowButtonStopMntor(showButtomStop);
  }, [selectedLab]);

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
            </div>
          </div>

          <div className={styles.blockRight}>
            <div className="flex inline-flexbox">
              {showButtonStopMntor ? (
                <div className={styles.Button} onClick={handleClickSMonitor}>
                  Detener Monitoreo
                </div>
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
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Comenzará la monitorización en el laboratorio <b>{lab}</b>,
                  estás seguro?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogMntor}>Salir</Button>
                <Button onClick={handleClickMonitor}>Monitorear</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>

        <div className={styles.block}>
          {/* <ReactPlayer
            url="https://www.youtube.com/watch?v=WmV5QKhmd0g&list=RDWmV5QKhmd0g&start_radio=1"
            controls
          /> */}
          {/* <video
            className="fm-video video-js vjs-16-9 vjs-big-play-centered"
            data-setup="{}"
            controls
          >
            <source
              src="../../../videos/testVideo.mp4"
              type="video/mp4"
            ></source>
          </video> */}
        </div>
      </div>
    </>
  );
}
