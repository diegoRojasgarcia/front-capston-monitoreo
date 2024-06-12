import React, { useState } from "react";
import {
  Typography,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  Bars4Icon,
  XMarkIcon,
  PencilSquareIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "@/hooks";
import {
  Dialogprogramacion,
  Dialogprogramacionactividad,
  Dialogprogramacionprueba,
} from "../Dialog";
import { Dialogopcionprogramacion } from "../Dialog/Dialogopcionprogramacion";

export function NavListMenu({ lab, setIsConfirmOpen }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { logout } = useAuth();
  const [openDialogOpcionProgramacion, setOpenDialogOpcionProgramacion] =
    React.useState(false);
  const [OpenDialogProgActividad, setOpenDialogProgActividad] =
    React.useState(false);
  const [OpenDialogProgPrueba, setOpenDialogProgPrueba] = React.useState(false);

  const [openDialogProg, setOpenDialogProg] = React.useState(false);
  //datepicker
  const [valueDateP, setValueDateP] = useState({
    startDate: "",
    endDate: new Date().setMonth(11),
  });

  //dialog monitoreo
  const handleOpenDialogOpcionProgramacion = () => {
    setOpenDialogOpcionProgramacion(true);
  };
  const handleCloseDialogOpcionProgramacion = () => {
    setOpenDialogOpcionProgramacion(false);
  };

  //digalog programacion del monitoreo
  const handleOpenDialogProg = () => {
    setOpenDialogProgActividad(true);
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

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center py-5 pr-4 font-medium text-gray-900 bg-gray-300 hover:bg-gray-400"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              {" "}
              {React.createElement(Bars4Icon, {
                strokeWidth: 2,
                className: " text-gray-900 w-6",
              })}
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          onClick={handleOpenDialogOpcionProgramacion}
          className="hidden rounded-xl lg:block"
        >
          <ul className="grid grid-cols-1 outline-none outline-0">
            <MenuItem className="flex items-center rounded-lg">
              <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                {" "}
                {React.createElement(PencilSquareIcon, {
                  strokeWidth: 2,
                  className: "h-6 text-gray-900 w-6 ",
                })}
              </div>
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="flex items-center text-sm font-bold pl-2"
                >
                  Programar Monitoreo
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-xs !font-medium text-blue-gray-500 pl-2"
                >
                  Programar monitoreo para una fecha específica
                </Typography>
              </div>
            </MenuItem>
            {/* <MenuItem className="flex items-center rounded-lg">
              <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                {" "}
                {React.createElement(VideoCameraIcon, {
                  strokeWidth: 2,
                  className: "h-6 text-gray-900 w-6 ",
                })}
              </div>
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="flex items-center text-sm font-bold pl-2"
                >
                  Live View
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-xs !font-medium text-blue-gray-500 pl-2"
                >
                  Visualización live view del laboratorio
                </Typography>
              </div>
            </MenuItem> */}
            <MenuItem onClick={logout} className="flex items-center rounded-lg">
              <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                {" "}
                {React.createElement(XMarkIcon, {
                  strokeWidth: 2,
                  className: "h-6 text-gray-900 w-6 ",
                })}
              </div>
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="flex items-center text-sm font-bold pl-2"
                >
                  Salir
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-xs !font-medium text-blue-gray-500 pl-2"
                >
                  Cerrar Sesión
                </Typography>
              </div>
            </MenuItem>
          </ul>
        </MenuList>
      </Menu>

      <Dialogopcionprogramacion
        openDialogOpcionProgramacion={openDialogOpcionProgramacion}
        handleCloseDialogOpcionProgramacion={
          handleCloseDialogOpcionProgramacion
        }
        setOpenDialogOpcionProgramacion={setOpenDialogOpcionProgramacion}
        message={"Que actividad vas a programar en el "}
        lab={lab}
        setOpenDialogProgActividad={setOpenDialogProgActividad}
        setOpenDialogProgPrueba={setOpenDialogProgPrueba}
        setIsConfirmOpen={setIsConfirmOpen}
      />

      <Dialogprogramacionactividad
        OpenDialogProgActividad={OpenDialogProgActividad}
        setOpenDialogProg={setOpenDialogProg}
        handleCloseDialogProg={handleCloseDialogProg}
        setOpenDialogProgActividad={setOpenDialogProgActividad}
        lab={lab}
        valueDateP={valueDateP}
        setValueDateP={setValueDateP}
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
    </React.Fragment>
  );
}
