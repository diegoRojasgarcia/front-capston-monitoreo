import { Button } from "semantic-ui-react";
import styles from "./LabsLayout.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { centosDirectory } from "@/api";
import { AutocompleteFecha, AutocompletePcs } from "@/components/Buttons";
import { Dialogmonitor } from "@/components/Dialog/Dialogmonitor";
import { Dialogstopmonitor } from "@/components/Dialog";
import { Dialogprogramacion } from "@/components/Dialog/Dialogprogramacion";

const cDirectory = new centosDirectory();

export function LabsLayout({ lab }) {
  const { user, startMonitor, stopMonitor } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  //datepicker
  const [valueDateP, setValueDateP] = useState({
    startDate: "",
    endDate: new Date().setMonth(11),
  });

  var selectedLab = localStorage.getItem("selectedLabs");

  //open dialog de monitoreo
  const [openDialogMntor, setOpenDialogMntor] = React.useState(false);
  const [showButtonStopMntor, setShowButtonStopMntor] = React.useState(false);
  const [openDialogStopMntor, setOpenDialogStopMntor] = React.useState(false);

  //open dialog de programacion del monitoreo
  const [openDialogProg, setOpenDialogProg] = React.useState(false);

  //boton monitoreo - stop monitoreo
  const [existFile, setExistFile] = React.useState(false);

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

  //dialog monitoreo
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

  //digalog programacion del monitoreo
  const handleOpenDialogProg = () => {
    setOpenDialogProg(true);
  };
  const handleCloseDialogProg = () => {
    setOpenDialogProg(false);
  };

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
              <Button onClick={handleOpenDialogProg}>
                Programar Monitoreo
              </Button>
            </div>
            <Dialogmonitor
              openDialogMntor={openDialogMntor}
              handleCloseDialogMntor={handleCloseDialogMntor}
              lab={lab}
              startMonitor={startMonitor}
              setOpenDialogMntor={setOpenDialogMntor}
              setShowButtonStopMntor={setShowButtonStopMntor}
              selectedLab={selectedLab}
            />
            <Dialogstopmonitor
              openDialogStopMntor={openDialogStopMntor}
              handleCloseDialogStopMntor={handleCloseDialogStopMntor}
              selectedLab={selectedLab}
              stopMonitor={stopMonitor}
              lab={lab}
              setShowButtonStopMntor={setShowButtonStopMntor}
              setOpenDialogStopMntor={setOpenDialogStopMntor}
            />
            <Dialogprogramacion
              openDialogProg={openDialogProg}
              handleCloseDialogProg={handleCloseDialogProg}
              selectedLab={selectedLab}
              lab={lab}
              valueDateP={valueDateP}
              setValueDateP={setValueDateP}
            />
          </div>
        </div>

        <div className={styles.block}></div>
      </div>
    </>
  );
}
