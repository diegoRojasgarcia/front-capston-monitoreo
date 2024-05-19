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
                <div className="w-[38rem] pt-2">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-gray-400 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-orange-400"
                      placeholder=" "
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-orange-400 before:border-blue-gray-200 peer-focus:before:!border-orange-400 after:border-blue-gray-200 peer-focus:after:!border-orange-400">
                      Actividad
                    </label>
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
                    Para empezar la monitorización en el laboratorio{" "}
                    <b>{selectedLab}</b>
                    ingresa la actividad.
                  </p>
                </div>
              </DialogContent>
              <DialogActions className="mb-4 mr-3">
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
