import { Button } from "semantic-ui-react";
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
import { Topbar } from "@/components/topBar";

const cDirectory = new centosDirectory();

export function LabsLayout({ lab }) {
  const { user, startMonitor, stopMonitor } = useAuth();
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
      {/* <Topbar /> */}
      {/* <div className={styles.topBar}>
          <div className="flex flex-row pt-1">
            <AutocompleteFecha
              openFechas={openFechas}
              setOpenFechas={setOpenFechas}
              valueFecha={valueFecha}
              inputValue={inputValueFecha}
              setValueFecha={setValueFecha}
              setInputValueFecha={setInputValueFecha}
            />
            <AutocompleteActividad
              openActividades={openActividades}
              setOpenActividades={setOpenActividades}
              valueActividad={valueActividad}
              inputValue={inputValueActividad}
              setValueActividad={setValueActividad}
              valueFecha={valueFecha}
              setInputValueActividad={setInputValueActividad}
            />
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
              <NavListMenu />
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
              setOpenDialogProg={setOpenDialogProg}
              handleCloseDialogProg={handleCloseDialogProg}
              selectedLab={selectedLab}
              lab={lab}
              valueDateP={valueDateP}
              setValueDateP={setValueDateP}
            />
          </div>
        </div> */}
      {/* <div>
          <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <button
                data-collapse-toggle="navbar-solid-bg"
                type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-solid-bg"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div
                class="hidden w-full md:block md:w-auto"
                id="navbar-solid-bg"
              >
                <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                  <li>
                    <AutocompleteFecha
                      openFechas={openFechas}
                      setOpenFechas={setOpenFechas}
                      valueFecha={valueFecha}
                      inputValue={inputValueFecha}
                      setValueFecha={setValueFecha}
                      setInputValueFecha={setInputValueFecha}
                    />
                  </li>
                  <li>
                    <AutocompleteFecha
                      openFechas={openFechas}
                      setOpenFechas={setOpenFechas}
                      valueFecha={valueFecha}
                      inputValue={inputValueFecha}
                      setValueFecha={setValueFecha}
                      setInputValueFecha={setInputValueFecha}
                    />
                  </li>
                  <li>
                    <AutocompleteFecha
                      openFechas={openFechas}
                      setOpenFechas={setOpenFechas}
                      valueFecha={valueFecha}
                      inputValue={inputValueFecha}
                      setValueFecha={setValueFecha}
                      setInputValueFecha={setInputValueFecha}
                    />
                  </li>
                  <li>
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
                        <Button onClick={handleOpenDialogMntor}>
                          Monitorear
                        </Button>
                      </>
                    )}
                  </li>
                  <li>
                    <Button onClick={handleOpenDialogProg}>
                      Programar Monitoreo
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div> */}
      {/* <div className="bg-gray-800 p-4 flex justify-between items-center">
        
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-3 py-2 rounded-md">
            Botón 1
          </button>
          <button className="bg-blue-500 text-white px-3 py-2 rounded-md">
            Botón 2
          </button>
          <button className="bg-blue-500 text-white px-3 py-2 rounded-md">
            Botón 3
          </button>
        </div>

        <div className="relative">
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded-md"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Dropdown
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Opción 1
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Opción 2
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Opción 3
              </a>
            </div>
          )}
        </div>
      </div> */}

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
            <button className="hidden sm:inline-block text-gray- bg-gray-300 hover:bg-gray-400 h-16 font-bold rounded">
              {showButtonStopMntor ? (
                <button
                  className="bg-orange-300 rounded-xl hover:bg-orange-400  h-16 px-3 font-bold rounded"
                  onClick={handleOpenDialogStopMntor}
                >
                  Detener Monitoreo
                </button>
              ) : (
                <>
                  <button
                    className="px-3 h-16 rounded-xl"
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
              className="sm:hidden bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              Menú
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="sm:hidden bg-gray-700 text-white">
            {showButtonStopMntor ? (
              <button
                onClick={handleOpenDialogStopMntor}
                className="block w-full text-left px-4 py-2 text-orange-600"
              >
                Detener Monitoreo
              </button>
            ) : (
              <>
                <button
                  onClick={handleOpenDialogMntor}
                  className="block w-full text-left px-4 py-2"
                >
                  Monitorear
                </button>{" "}
              </>
            )}
            <button
              onClick={handleOpenDialogProg}
              className="block w-full text-left px-4 py-2"
            >
              Programar monitoreo
            </button>
            <button className="block w-full text-left px-4 py-2">Salir</button>
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

      <div className={styles.block}>
        Ruta Video: {""}
        {valueFecha ? valueFecha.nombre + "/" : <></>}
        {valueActividad ? valueActividad.nombre + "/" : <></>}
        {valuePcs ? valuePcs.nombre : <></>}
      </div>
    </>
  );
}
