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
  VideoCameraIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "@/hooks";
import { Dialogprogramacion } from "@/components/Dialog/Dialogprogramacion";

export function NavListMenu({ lab }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { logout } = useAuth();
  const [openDialogProg, setOpenDialogProg] = React.useState(false);
  //datepicker
  const [valueDateP, setValueDateP] = useState({
    startDate: "",
    endDate: new Date().setMonth(11),
  });

  //digalog programacion del monitoreo
  const handleOpenDialogProg = () => {
    setOpenDialogProg(true);
  };
  const handleCloseDialogProg = () => {
    setOpenDialogProg(false);
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
              className="flex items-center py-5 pr-4 font-medium text-gray-900 bg-gray-300"
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
              onClick={handleOpenDialogProg}
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
            <MenuItem className="flex items-center rounded-lg">
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
      <Dialogprogramacion
        openDialogProg={openDialogProg}
        setOpenDialogProg={setOpenDialogProg}
        handleCloseDialogProg={handleCloseDialogProg}
        lab={lab}
        valueDateP={valueDateP}
        setValueDateP={setValueDateP}
      />
    </React.Fragment>
  );
}
