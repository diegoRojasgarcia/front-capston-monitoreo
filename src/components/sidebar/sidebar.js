// @/components/Layout/Sidebar.js
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import logo from "@/img/logoUcn.png";
import { Button } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import Link from "next/link";
import { User, centosDirectory } from "@/api";
import { DialogLaboratorios } from "../Dialog/dialogLaboratorios";

const cDirectory = new centosDirectory();

export function Sidebar() {
  const { logout } = useAuth();
  const [stateLabs, setStateLabs] = useState([]);
  const [sleclab, setSleclab] = useState("");
  const [labactualizado, setLabActualizado] = useState(false);

  const router = useRouter();

  //dialog setting
  const [openDialogSetting, setOpenDialogSetting] = React.useState(false);

  //dialog monitoreo
  const handleOpenDialogSetting = () => {
    setOpenDialogSetting(true);
  };
  const handleCloseDialogSetting = () => {
    setOpenDialogSetting(false);
  };

  React.useEffect(() => {
    cDirectory.getLaboratorios();
    cDirectory.getLabs().then((response) => {
      setStateLabs(response);
    });
    var selectedLab = JSON.parse(localStorage.getItem("selectedLabs"));
    setSleclab(selectedLab);
  }, []);

  const handleLabClick = async (lab) => {
    const laboratorio = {
      id: lab.id,
      nombre: lab.nombre,
      displayName: lab.displayName,
    };
    localStorage.setItem("selectedLabs", JSON.stringify(laboratorio));
    setSleclab(laboratorio);
  };

  const handleHomeClick = async () => {
    localStorage.setItem("selectedLabs", null);
  };

  return (
    <>
      <div className="fixed flex flex-col top-0 left-0 bg-gray-900 h-full min-w-64">
        <div className="flex items-center justify-center pt-24">
          <Link href="/home">
            <img
              onClick={() => handleHomeClick()}
              src={logo.src}
              alt="Company Logo"
              width={100}
              height={200}
            />
          </Link>
        </div>
        <div className="relative flex flex-row text-xl text-white items-center justify-center mt-20 mb-4">
          <div className="text-white">Sistema De Monitoreo EIC</div>
        </div>

        {/* <div className="relative flex flex-row text-sm text-white items-center justify-center h-10 pb-2  border-b-2">
          <div className="text-white ">{user.email}</div>
        </div> */}

        <div className="overflow-y-auto overflow-x-auto flex-grow">
          <ul className="flex flex-col items-center py-4 space-y-4 pt-6">
            <li className="h-12 text-xl p-3 text-white border-b-2">
              laboratorios
            </li>
            {stateLabs ? (
              <li>
                {stateLabs.map((labs, index) => (
                  <Link
                    key={index}
                    href={`/home/${labs.nombre}`}
                    onClick={() => handleLabClick(labs)}
                    className={`block text-lg font-medium ${
                      labs.nombre == sleclab?.nombre
                        ? "relative flex flex-row items-center rounded-xl h-12 focus:outline-none bg-orange-400 text-white text-xl  hover:text-gray-100 border-l-4 border-transparent border-orange-400 pr-6 mt-2"
                        : "relative flex flex-row items-center rounded-xl h-12 focus:outline-none hover:bg-gray-800 text-white text-xl hover:text-gray-100 border-l-4 border-transparent hover:border-orange-400 pr-6 mt-2"
                    }`}
                  >
                    <span className="inline-flex justify-center items-center ml-4 ">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="white"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                      </svg>
                    </span>
                    {labs.displayName != "" ? (
                      <span className={"text-white ml-4 pt-1"}>
                        {labs.displayName}
                      </span>
                    ) : (
                      <span className={"text-white ml-4 pt-1"}>
                        {labs.nombre}
                      </span>
                    )}
                  </Link>
                ))}
              </li>
            ) : (
              <div className="pt-40">
                <div
                  className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            )}
          </ul>
        </div>

        <div className="flex items-center justify-center pb-6 text-white ">
          {" "}
          <svg
            onClick={handleOpenDialogSetting}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="size-7 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>

        <div>
          {User ? (
            <div className="flex items-center justify-center pb-12">
              <Button onClick={logout}>Cerrar Sesion</Button>
            </div>
          ) : (
            <div>
              <a href="/">Iniciar Sesion</a>
            </div>
          )}
        </div>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#155e75"
            fillOpacity="1"
            d="M0,256L48,224C96,192,192,128,288,122.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,154.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg> */}
      </div>

      <DialogLaboratorios
        openDialogSetting={openDialogSetting}
        handleCloseDialogSetting={handleCloseDialogSetting}
        setOpenDialogSetting={setOpenDialogSetting}
        message={"Selecciona una opción para el"}
        setLabActualizado={setLabActualizado}
      />
    </>
  );
}
