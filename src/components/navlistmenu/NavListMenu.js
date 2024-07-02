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
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "@/hooks";
import {
  Dialogprogramacionactividad,
  Dialogprogramacionprueba,
} from "../Dialog";
import { Dialogopcionprogramacion } from "../Dialog/Dialogopcionprogramacion";
import { DialogoProgramaciones } from "../Dialog/dialogProgramaciones";

export function NavListMenu({
  selectedLabNombre,
  selectedLabDN,
  setIsConfirmOpen,
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { logout } = useAuth();
  const [openDialogOpcionProgramacion, setOpenDialogOpcionProgramacion] =
    React.useState(false);
  const [OpenDialogProgActividad, setOpenDialogProgActividad] =
    React.useState(false);
  const [OpenDialogProgPrueba, setOpenDialogProgPrueba] = React.useState(false);

  const [openDialogProg, setOpenDialogProg] = React.useState(false);

  const [openDialogProgramaciones, setOpenDialogProgramaciones] =
    React.useState(false);
  //datepicker
  const [valueDateP, setValueDateP] = useState({
    startDate: "",
    endDate: new Date().setMonth(11),
  });

  //dialog programaciones
  const handleOpenDialogProgramaciones = () => {
    setOpenDialogProgramaciones(true);
  };
  const handleCloseDialogProgramaciones = () => {
    setOpenDialogProgramaciones(false);
  };

  //dialog monitoreo
  const handleOpenDialogOpcionProgramacion = () => {
    setOpenDialogOpcionProgramacion(true);
  };
  const handleCloseDialogOpcionProgramacion = () => {
    setOpenDialogOpcionProgramacion(false);
  };

  const handleCloseDialogProg = () => {
    setOpenDialogProgActividad(false);
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
        <MenuList className="hidden rounded-xl lg:block">
          <ul className="grid grid-cols-1 outline-none outline-0">
            <MenuItem
              onClick={handleOpenDialogOpcionProgramacion}
              className="flex items-center rounded-lg"
            >
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
            <MenuItem
              onClick={handleOpenDialogProgramaciones}
              className="flex items-center rounded-lg"
            >
              <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                {" "}
                {React.createElement(BookOpenIcon, {
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
                  Programaciones
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-xs !font-medium text-blue-gray-500 pl-2"
                >
                  Programaciones de monitoreo
                </Typography>
              </div>
            </MenuItem>

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
        selectedLabNombre={selectedLabNombre}
        selectedLabDN={selectedLabDN}
        setOpenDialogOpcionProgramacion={setOpenDialogOpcionProgramacion}
        message={"Que actividad vas a programar en el "}
        setOpenDialogProgActividad={setOpenDialogProgActividad}
        setOpenDialogProgPrueba={setOpenDialogProgPrueba}
        setIsConfirmOpen={setIsConfirmOpen}
      />

      <DialogoProgramaciones
        openDialogProgramaciones={openDialogProgramaciones}
        handleCloseDialogProgramaciones={handleCloseDialogProgramaciones}
        setOpenDialogProgramaciones={setOpenDialogProgramaciones}
      />

      <Dialogprogramacionactividad
        OpenDialogProgActividad={OpenDialogProgActividad}
        setOpenDialogProg={setOpenDialogProg}
        handleCloseDialogProg={handleCloseDialogProg}
        setOpenDialogProgActividad={setOpenDialogProgActividad}
        selectedLabNombre={selectedLabNombre}
        selectedLabDN={selectedLabDN}
        valueDateP={valueDateP}
        setValueDateP={setValueDateP}
        setIsConfirmOpen={setIsConfirmOpen}
      />

      <Dialogprogramacionprueba
        OpenDialogProgPrueba={OpenDialogProgPrueba}
        setOpenDialogProg={setOpenDialogProgPrueba}
        handleCloseDialogProgPrueba={handleCloseDialogProgPrueba}
        setOpenDialogProgPrueba={setOpenDialogProgPrueba}
        selectedLabNombre={selectedLabNombre}
        selectedLabDN={selectedLabDN}
        valueDateP={valueDateP}
        setValueDateP={setValueDateP}
        setIsConfirmOpen={setIsConfirmOpen}
      />
    </React.Fragment>
  );
}
