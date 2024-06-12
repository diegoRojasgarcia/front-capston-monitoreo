import styles from "../LabsLayout/LabsLayout.module.scss";
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
import {
  Bars4Icon,
  VideoCameraIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import ConfirmDialog from "@/components/confirmdialog/confirmdialog";
import { Dialogopcionprogramacion } from "@/components/Dialog/Dialogopcionprogramacion";
import { Dialogprogramacionprueba } from "@/components/Dialog/DialogprogramacionPrueba";
import Link from "next/link";

const cDirectory = new centosDirectory();

export function LiveViewLayout({ lab }) {
  const { user, startMonitor, stopMonitor, logout } = useAuth();
  const router = useRouter();
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
      });
    } catch (error) {
      console.error(error);
    }
    let showButtomStop = existFile;
    setShowButtonStopMntor(showButtomStop);
  }, [lab]);

  //dialog monitoreo
  const handleOpenDialogOpcion = () => {
    setOpenDialogOpcion(true);
  };
  const handleCloseDialogOpcion = () => {
    setOpenDialogOpcion(false);
  };

  const handleOpenDialogStopMntor = () => {
    setOpenDialogStopMntor(true);
  };
  const handleCloseDialogStopMntor = () => {
    setOpenDialogStopMntor(false);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-white text-white max-w-full">
        <div className="mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button className="hidden sm:inline-block rounded-xl mr-2 px-3 h-16 text-gray-600 bg-gray-300 hover:bg-gray-400 font-bold rounded">
              Computador
            </button>
            <button className="hidden sm:inline-block rounded-xl ml-2 px-3 h-16 text-gray-600 bg-gray-300 hover:bg-gray-400 font-bold  rounded">
              Laboratorio
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hidden sm:inline-block text-gray-400 h-16 font-bold rounded-xl">
              {showButtonStopMntor ? (
                <>
                  <div className="flex items-center space-x-4">
                    <button className="bg-orange-300 hover:bg-orange-400  h-16 px-3 font-bold rounded-xl ">
                      <Link href="/home">
                        {React.createElement(ArrowRightEndOnRectangleIcon, {
                          strokeWidth: 2,
                          className: " text-gray-900 w-6",
                        })}
                      </Link>{" "}
                    </button>
                    <button
                      className="bg-orange-300 hover:bg-orange-400  h-16 px-3 font-bold rounded-xl"
                      onClick={handleOpenDialogStopMntor}
                    >
                      Detener Monitoreo
                    </button>
                  </div>
                </>
              ) : (
                <button className="bg-orange-300 hover:bg-orange-400  h-16 px-3 font-bold rounded-xl ">
                  <Link href="/home">
                    {React.createElement(ArrowRightEndOnRectangleIcon, {
                      strokeWidth: 2,
                      className: " text-gray-900 w-6",
                    })}
                  </Link>{" "}
                </button>
              )}
            </button>
          </div>
        </div>
      </div>

      <Dialogstopmonitor
        openDialogStopMntor={openDialogStopMntor}
        handleCloseDialogStopMntor={handleCloseDialogStopMntor}
        selectedLab={selectedLab}
        stopMonitor={stopMonitor}
        lab={lab}
        setShowButtonStopMntor={setShowButtonStopMntor}
        setOpenDialogStopMntor={setOpenDialogStopMntor}
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
      </div>
    </>
  );
}
