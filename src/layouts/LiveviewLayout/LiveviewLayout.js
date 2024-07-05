import styles from "../LabsLayout/LabsLayout.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { centosDirectory } from "@/api";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { AutocompleteLaboratorio } from "@/components/Buttons";
import {
  AutocompleteActividad,
  AutocompletePcs,
} from "@/components/Buttons/autocomplete/liveview";
import DirectoryViewer from "@/components/DirectoryViewer/DirectoryViewer";
import LabsViewer from "@/components/LabsActivity/LabsViewer";

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son de 0 a 11
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const cDirectory = new centosDirectory();

export function LiveViewLayout() {
  const { user, stopMonitor } = useAuth();
  const router = useRouter();

  const [valueFecha, setValueFecha] = React.useState(null);

  //para los laboratorios
  const [openLaboratorios, setOpenLaboratorios] = React.useState(false);
  const [valueLaboratorio, setValueLaboratorio] = React.useState(null);
  const [inputValueLaboratorio, setInputValueLaboratorio] = React.useState("");

  //para las actividades
  const [openActividades, setOpenActividades] = React.useState(false);
  const [valueActividad, setValueActividad] = React.useState(null);
  const [inputValueActividad, setInputValueActividad] = React.useState("");

  //para los computadores
  const [openPcs, setOpenPcs] = React.useState(false);
  const [valuePcs, setValuePcs] = React.useState(null);
  const [inputValuePcs, setInputValuePcs] = React.useState("");

  if (!user) {
    router.push("/");
    return null;
  }

  React.useEffect(() => {
    const currentDate = getCurrentDate();
    setValueFecha(currentDate);
  }, []);

  const backtoHome = () => {
    router.push("/home");
    localStorage.setItem("selectedLabs", null);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-white text-white max-w-full ">
        <div className="mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <AutocompleteLaboratorio
              openLaboratorios={openLaboratorios}
              setOpenLaboratorios={setOpenLaboratorios}
              valueLaboratorio={valueLaboratorio}
              inputValue={inputValueLaboratorio}
              setValueLaboratorio={setValueLaboratorio}
              setInputValueLaboratorio={setInputValueLaboratorio}
            />
            {valueLaboratorio ? (
              <AutocompleteActividad
                openActividades={openActividades}
                setOpenActividades={setOpenActividades}
                valueActividad={valueActividad}
                inputValue={inputValueActividad}
                setValueActividad={setValueActividad}
                setInputValueActividad={setInputValueActividad}
                valueLaboratorio={valueLaboratorio}
              />
            ) : null}

            {valueActividad ? (
              <>
                <AutocompletePcs
                  openPcs={openPcs}
                  setOpenPcs={setOpenPcs}
                  valuePcs={valuePcs}
                  inputValue={inputValuePcs}
                  setValuePcs={setValuePcs}
                  setInputValuePcs={setInputValuePcs}
                  valueActividad={valueActividad}
                  valueLaboratorio={valueLaboratorio}
                />
                {/* <button className="hidden sm:inline-block rounded-xl ml-2 px-3 h-16 text-gray-600 bg-gray-300 hover:bg-gray-400 font-bold  rounded">
                  Laboratorio
                </button> */}
              </>
            ) : null}
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:inline-block text-gray-400 h-16 font-bold rounded-xl">
              <button
                onClick={backtoHome}
                className="bg-orange-300 hover:bg-orange-400 h-16 px-3 font-bold rounded-xl "
              >
                {React.createElement(ArrowRightEndOnRectangleIcon, {
                  strokeWidth: 2,
                  className: " text-gray-900 w-6",
                })}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido de la pagina */}

      <div className={styles.block}>
        {valueActividad && valuePcs == null ? (
          <LabsViewer lab={valueLaboratorio} actividad={valueActividad} />
        ) : null}

        {valueActividad && valuePcs ? (
          <DirectoryViewer
            lab={valueLaboratorio}
            actividad={valueActividad}
            currentPC={valuePcs}
          />
        ) : null}
      </div>
    </>
  );
}
