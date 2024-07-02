import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import React, { useState } from "react";
import { centosDirectory } from "@/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Dialogopcion({
  openDialogOpcion,
  handleCloseDialogOpcion,
  setOpenDialogMntorActividad,
  setOpenDialogOpcion,
  selectedLabNombre,
  selectedLabDN,
  setOpenDialogMntorPrueba,
  message,
}) {
  //dialog monitoreo actividad
  const handleOpenDialogActividad = () => {
    setOpenDialogMntorActividad(true);
    setOpenDialogOpcion(false);
  };

  //dialog monitoreo prueba
  const handleOpenDialogPrueba = () => {
    setOpenDialogMntorPrueba(true);
    setOpenDialogOpcion(false);
  };

  return (
    <Dialog
      open={openDialogOpcion}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialogOpcion}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <div className="flex items-center justify-center text-center sm:block sm:p-0">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden  transform transition-all sm:align-middle w-200">
            <div className="bg-white ">
              <div className="sm:flex sm:items-start sm:justify-center">
                <div className="mt-3 text-center justify-center">
                  {selectedLabDN ? (
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {message} {selectedLabDN}
                    </h3>
                  ) : (
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {message} {selectedLabNombre}
                    </h3>
                  )}

                  <div className="mt-2">
                    <p className="text-lg text-gray-500 justify-center">
                      ¿ Qué es lo que vas a monitorear ?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-4 py-4 sm:px-16 flex justify-between">
              <button
                type="button"
                className="w-1/2 mr-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 hover:bg-gray-400 text-base font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 sm:text-xl "
                onClick={handleOpenDialogActividad}
              >
                Actividad
              </button>
              <button
                type="button"
                className="w-1/2 ml-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-300 hover:bg-gray-400 text-base font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 sm:text-xl "
                onClick={handleOpenDialogPrueba}
              >
                Evaluación
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
