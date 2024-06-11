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
import { Dialogmonitor } from "@/components/Dialog/Dialogmonitor";
import { Dialogstopmonitor } from "@/components/Dialog";
import { Dialogprogramacion } from "@/components/Dialog/Dialogprogramacion";
import { NavListMenu } from "@/components/menu";
import { VideoComp } from "@/components/Video";
import { Bars4Icon } from "@heroicons/react/24/solid";

const cDirectory = new centosDirectory();

export function LabsLayout({ lab }) {
  const { user, startMonitor, stopMonitor, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const [openActividades, setOpenActividades] = React.useState(false);
  const [valueActividad, setValueActividad] = React.useState(null);
  const [inputValueActividad, setInputValueActividad] = React.useState("");

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
      {/* TOP BAR */}
      <div className="bg-white text-white max-w-full">
        <div className="mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button className="hidden sm:inline-block text-white font-bold rounded">
              <AutocompleteFecha
                openFechas={openFechas}
                setOpenFechas={setOpenFechas}
                valueFecha={valueFecha}
                inputValue={inputValueFecha}
                setValueFecha={setValueFecha}
                setInputValueFecha={setInputValueFecha}
              />
            </button>
            <button className="hidden sm:inline-block  text-white font-bold  rounded">
              <AutocompleteActividad
                openActividades={openActividades}
                setOpenActividades={setOpenActividades}
                valueActividad={valueActividad}
                inputValue={inputValueActividad}
                setValueActividad={setValueActividad}
                valueFecha={valueFecha}
                setInputValueActividad={setInputValueActividad}
              />
            </button>
            <button className="hidden sm:inline-block  text-white font-bold  rounded">
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
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hidden sm:inline-block text-gray-600 bg-gray-300 hover:bg-gray-400 h-16 font-bold rounded-xl">
              {showButtonStopMntor ? (
                <button
                  className="bg-orange-300 hover:bg-orange-400  h-16 px-3 font-bold rounded-xl"
                  onClick={handleOpenDialogStopMntor}
                >
                  Detener Monitoreo
                </button>
              ) : (
                <>
                  <button
                    className="px-4 h-16 rounded-xl"
                    onClick={handleOpenDialogMntor}
                  >
                    Monitorear
                  </button>
                </>
              )}
            </button>
            <button className="hidden sm:inline-block  text-white font-bold  rounded">
              <NavListMenu lab={lab} />
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
                  onClick={handleOpenDialogMntor}
                  className="block w-full px-4 py-2 bg-gray-400 hover:bg-gray-500 "
                >
                  Monitorear
                </button>{" "}
              </>
            )}
            <button
              onClick={handleOpenDialogProg}
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
        setOpenDialogProg={setOpenDialogProg}
        handleCloseDialogProg={handleCloseDialogProg}
        selectedLab={selectedLab}
        lab={lab}
        valueDateP={valueDateP}
        setValueDateP={setValueDateP}
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
      </div>
    </>
  );
}
