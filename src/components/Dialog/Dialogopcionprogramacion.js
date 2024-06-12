import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import React, { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Dialogopcionprogramacion({
  openDialogOpcionProgramacion,
  setOpenDialogOpcionProgramacion,
  handleCloseDialogOpcionProgramacion,
  message,
  setOpenDialogProgActividad,
  setOpenDialogProgPrueba,
  lab
}) {
  //dialog monitoreo actividad
  const handleOpenDialogProgActividad = () => {
    setOpenDialogOpcionProgramacion(false)
    setOpenDialogProgActividad(true)
  };

  //dialog monitoreo prueba
  const handleOpenDialogProgPrueba = () => {
    setOpenDialogOpcionProgramacion(false)
    setOpenDialogProgPrueba(false)
  };

  return (
    <Dialog
      open={openDialogOpcionProgramacion}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialogOpcionProgramacion}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <div className="flex items-center justify-center text-center sm:block sm:p-0">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle w-200">
            <div className="bg-white ">
              <div className="sm:flex sm:items-start sm:justify-center">
                <div className="mt-3 text-center justify-center">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    {message} {lab} {"?"}
                  </h3>
                  <div className="mt-2">
                    <p className="text-lg text-gray-500 justify-center">
                      ¿ Qué es lo que vas a monitorear ?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-16 flex justify-between">
              <button
                type="button"
                className="w-1/2 mr-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 hover:bg-gray-400 text-base font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-xl "
                onClick={handleOpenDialogProgActividad}
              >
                Actividad
              </button>
              <button
                type="button"
                className="w-1/2 ml-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-300 hover:bg-gray-400 text-base font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-xl "
                onClick={handleOpenDialogProgPrueba}
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
