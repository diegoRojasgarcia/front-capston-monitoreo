import styles from "./LabsLayout.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { centosDirectory } from "@/api";
import {
  AutocompleteActividad,
  AutocompleteFecha,
  AutocompletePcs,
} from "@/components/Buttons";
import {
  Dialogmonitoractividad,
  Dialogstopmonitor,
  Dialogopcion,
  Dialogmonitorprueba,
  Dialogprogramacionactividad,
} from "@/components/Dialog";
import { NavListMenu } from "@/components/navlistmenu";
import { VideoComp } from "@/components/Video";
import { Bars4Icon, VideoCameraIcon } from "@heroicons/react/24/solid";
import ConfirmDialog from "@/components/confirmdialog/confirmdialog";
import { Dialogopcionprogramacion } from "@/components/Dialog/Dialogopcionprogramacion";
import { Dialogprogramacionprueba } from "@/components/Dialog/DialogprogramacionPrueba";
import Link from "next/link";

const cDirectory = new centosDirectory();

export function LabsLayout({ lab }) {
  const { user, startMonitor, stopMonitor, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showButtonLiveView, setShowButtonLiveView] = React.useState(false);
  const [labsMonitoring, setLabsMonitoring] = React.useState([]);

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

  //open dialog de Opcion
  const [openDialogOpcion, setOpenDialogOpcion] = React.useState(false);

  //open dialog de monitoreo actividad
  const [openDialogMntorActividad, setOpenDialogMntorActividad] =
    React.useState(false);

  //open dialog de monitoreo actividad
  const [openDialogMntorPrueba, setOpenDialogMntorPrueba] =
    React.useState(false);

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

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  //para los computadores
  const [openPcs, setOpenPcs] = React.useState(false);
  const [valuePcs, setValuePcs] = React.useState(null);
  const [inputValuePcs, setInputValuePcs] = React.useState("");

  const [openActividades, setOpenActividades] = React.useState(false);
  const [valueActividad, setValueActividad] = React.useState(null);
  const [inputValueActividad, setInputValueActividad] = React.useState("");

  const [openDialogOpcionProgramacion, setOpenDialogOpcionProgramacion] =
    React.useState(false);

  const [OpenDialogProgActividad, setOpenDialogProgActividad] =
    React.useState(false);

  const [OpenDialogProgPrueba, setOpenDialogProgPrueba] = React.useState(false);

  React.useEffect(() => {
    try {
      cDirectory.existFile({ lab: selectedLab }).then((response) => {
        setExistFile(response.exist);
        setShowButtonStopMntor(response.exist);
        setShowButtonLiveView(response.exist);
      });
    } catch (error) {
      console.error(error);
    }
    let showButtomStop = existFile;
    let showButtonLiveView = existFile;
    setShowButtonStopMntor(showButtomStop);
    setShowButtonLiveView(showButtonLiveView);
  }, [selectedLab]);

  //dialog monitoreo
  const handleOpenDialogOpcion = () => {
    setOpenDialogOpcion(true);
  };
  const handleCloseDialogOpcion = () => {
    setOpenDialogOpcion(false);
  };

  //dialog monitoreo actividad
  const handleOpenDialogMntorActividad = () => {
    setOpenDialogMntorActividad(true);
  };
  const handleCloseDialogMntorActividad = () => {
    setOpenDialogMntorActividad(false);
  };

  //dialog monitoreo prueba
  const handleOpenDialogMntorPrueba = () => {
    setOpenDialogMntorPrueba(true);
  };
  const handleCloseDialogMntorPrueba = () => {
    setOpenDialogMntorPrueba(false);
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
    setOpenDialogProgActividad(false);
  };

  //digalog programacion del monitoreo
  const handleOpenDialogProgPrueba = () => {
    setOpenDialogProgPrueba(true);
  };
  const handleCloseDialogProgPrueba = () => {
    setOpenDialogProgPrueba(false);
  };

  //dialog monitoreo
  const handleOpenDialogOpcionProgramacion = () => {
    setOpenDialogOpcionProgramacion(true);
  };

  const handleCloseDialogOpcionProgramacion = () => {
    setOpenDialogOpcionProgramacion(false);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-white text-white max-w-full">
        <div className="mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="hidden sm:inline-block  text-white font-bold  rounded">
              <AutocompleteFecha
                openFechas={openFechas}
                setOpenFechas={setOpenFechas}
                valueFecha={valueFecha}
                inputValue={inputValueFecha}
                setValueFecha={setValueFecha}
                setInputValueFecha={setInputValueFecha}
              />
            </div>
            <div className="hidden sm:inline-block  text-white font-bold  rounded">
              {valueFecha ? (
                <AutocompleteActividad
                  openActividades={openActividades}
                  setOpenActividades={setOpenActividades}
                  valueActividad={valueActividad}
                  inputValue={inputValueActividad}
                  setValueActividad={setValueActividad}
                  valueFecha={valueFecha}
                  setInputValueActividad={setInputValueActividad}
                />
              ) : null}
            </div>
            <div className="hidden sm:inline-block  text-white font-bold  rounded">
              {valueActividad ? (
                <AutocompletePcs
                  openPcs={openPcs}
                  setOpenPcs={setOpenPcs}
                  valuePcs={valuePcs}
                  inputValue={inputValuePcs}
                  setValuePcs={setValuePcs}
                  setInputValuePcs={setInputValuePcs}
                  valueFecha={valueFecha}
                  valueActividad={valueActividad}
                />
              ) : null}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:inline-block text-gray-400 h-16 font-bold rounded-xl">
              {showButtonStopMntor ? (
                <>
                  <div className="flex items-center space-x-4">
                    {/* <button className="bg-orange-300 hover:bg-orange-400  h-16 px-3 font-bold rounded-xl ">
                      {" "}
                      <Link href="/home/liveview">
                        {React.createElement(VideoCameraIcon, {
                          strokeWidth: 2,
                          className: " text-gray-900 w-6",
                        })}
                      </Link>
                    </button> */}
                    <button
                      className="bg-orange-300 hover:bg-orange-400  h-16 px-3 font-bold rounded-xl"
                      onClick={handleOpenDialogStopMntor}
                    >
                      Detener Monitoreo
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="px-4 h-16 rounded-xl bg-gray-300 hover:bg-gray-400  text-gray-600 "
                    onClick={handleOpenDialogOpcion}
                  >
                    Monitorear
                  </button>
                </>
              )}
            </div>
            <button className="hidden sm:inline-block  text-white font-bold  rounded">
              <NavListMenu lab={lab} setIsConfirmOpen={setIsConfirmOpen} />
            </button>
            <button
              className="sm:hidden bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              {" "}
              {React.createElement(Bars4Icon, {
                strokeWidth: 2,
                className: "w-6",
              })}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="sm:hidden bg-gray-700 text-white justify-center">
            {showButtonStopMntor ? (
              <button
                onClick={handleOpenDialogStopMntor}
                className="block w-full px-4 py-2 text-orange-600 bg-gray-400 hover:bg-gray-500"
              >
                Detener Monitoreo
              </button>
            ) : (
              <>
                <button
                  onClick={handleOpenDialogOpcion}
                  className="block w-full px-4 py-2 bg-gray-400 hover:bg-gray-500 "
                >
                  Monitorear
                </button>{" "}
              </>
            )}
            <button
              onClick={handleOpenDialogOpcionProgramacion}
              className="block w-full px-4 py-2 bg-gray-400 hover:bg-gray-500"
            >
              Programar monitoreo
            </button>
            <button
              onClick={logout}
              className="block w-full  px-4 py-2 bg-gray-400 hover:bg-gray-500"
            >
              Salir
            </button>
          </div>
        )}
      </div>

      <button className="fixed bottom-4 right-4 bg-orange-300 text-white p-4 m-6 rounded-full shadow-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        {" "}
        <Link href="/home/liveview">
          {React.createElement(VideoCameraIcon, {
            strokeWidth: 2,
            className: " text-gray-900 w-7",
          })}
        </Link>
      </button>

      <Dialogopcion
        openDialogOpcion={openDialogOpcion}
        handleCloseDialogOpcion={handleCloseDialogOpcion}
        setOpenDialogOpcion={setOpenDialogOpcion}
        setShowButtonStopMntor={setShowButtonStopMntor}
        selectedLab={selectedLab}
        setOpenDialogMntorActividad={setOpenDialogMntorActividad}
        handleOpenDialogMntorActividad={handleOpenDialogMntorActividad}
        setOpenDialogMntorPrueba={setOpenDialogMntorPrueba}
        handleOpenDialogMntorPrueba={handleOpenDialogMntorPrueba}
        message={"Selecciona una opción para el"}
      />

      <Dialogmonitoractividad
        openDialogMntorActividad={openDialogMntorActividad}
        handleCloseDialogMntorActividad={handleCloseDialogMntorActividad}
        lab={lab}
        startMonitor={startMonitor}
        setOpenDialogMntorActividad={setOpenDialogMntorActividad}
        setShowButtonStopMntor={setShowButtonStopMntor}
        selectedLab={selectedLab}
        setIsConfirmOpen={setIsConfirmOpen}
      />

      <Dialogmonitorprueba
        openDialogMntorPrueba={openDialogMntorPrueba}
        handleCloseDialogMntorPrueba={handleCloseDialogMntorPrueba}
        lab={lab}
        startMonitor={startMonitor}
        setOpenDialogMntorPrueba={setOpenDialogMntorPrueba}
        setShowButtonStopMntor={setShowButtonStopMntor}
        selectedLab={selectedLab}
        setIsConfirmOpen={setIsConfirmOpen}
      />

      <Dialogstopmonitor
        openDialogStopMntor={openDialogStopMntor}
        handleCloseDialogStopMntor={handleCloseDialogStopMntor}
        selectedLab={selectedLab}
        stopMonitor={stopMonitor}
        lab={lab}
        setShowButtonStopMntor={setShowButtonStopMntor}
        setOpenDialogStopMntor={setOpenDialogStopMntor}
        setIsConfirmOpen={setIsConfirmOpen}
        setShowButtonLiveView={setShowButtonLiveView}
      />

      <Dialogopcionprogramacion
        openDialogOpcionProgramacion={openDialogOpcionProgramacion}
        handleCloseDialogOpcionProgramacion={
          handleCloseDialogOpcionProgramacion
        }
        setOpenDialogOpcionProgramacion={setOpenDialogOpcionProgramacion}
        setOpenDialogProgActividad={setOpenDialogProgActividad}
        setOpenDialogProgPrueba={setOpenDialogProgPrueba}
        message={"Que actividad vas a programar en el "}
        lab={lab}
        setIsConfirmOpen={setIsConfirmOpen}
      />

      <Dialogprogramacionactividad
        OpenDialogProgActividad={OpenDialogProgActividad}
        handleCloseDialogProg={handleCloseDialogProg}
        lab={lab}
        valueDateP={valueDateP}
        setValueDateP={setValueDateP}
        setOpenDialogProgActividad={setOpenDialogProgActividad}
        setIsConfirmOpen={setIsConfirmOpen}
      />

      <Dialogprogramacionprueba
        OpenDialogProgPrueba={OpenDialogProgPrueba}
        setOpenDialogProg={setOpenDialogProgPrueba}
        handleCloseDialogProgPrueba={handleCloseDialogProgPrueba}
        setOpenDialogProgPrueba={setOpenDialogProgPrueba}
        lab={lab}
        valueDateP={valueDateP}
        setValueDateP={setValueDateP}
        setIsConfirmOpen={setIsConfirmOpen}
      />

      <ConfirmDialog
        message="La acción se ha realizado correctamente."
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
      />

      {/* Contenido de la pagina */}

      <div className={styles.block}>
        {valuePcs ? (
          <VideoComp
            selectedLab={selectedLab}
            valueFecha={valueFecha ? valueFecha.nombre : null}
            valueActividad={valueActividad ? valueActividad.nombre : null}
            valuePcs={valuePcs ? valuePcs.nombre : null}
          />
        ) : null}

        {/* { showButtonLiveView ? (
          <button className="fixed bottom-4 right-4 bg-orange-300 text-white p-4 m-6 rounded-full shadow-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {" "}
            <Link href="/home/liveview">
              {React.createElement(VideoCameraIcon, {
                strokeWidth: 2,
                className: " text-gray-900 w-7",
              })}
            </Link>
          </button>
        ) : null} */}
      </div>
    </>
  );
}
