import React from "react";
import { Button } from "semantic-ui-react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { centosDirectory } from "@/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const cDirectory = new centosDirectory();

export function Dialogstopmonitor({
  openDialogStopMntor,
  handleCloseDialogStopMntor,
  selectedLab,
  stopMonitor,
  setShowButtonStopMntor,
  setOpenDialogStopMntor,
  lab,
  setIsConfirmOpen,
}) {
  const handleClickSMonitor = () => {
    cDirectory.deleteFile({ lab: lab }).then((response) => {
      stopMonitor();
      setOpenDialogStopMntor(false);
      setShowButtonStopMntor(false);
      setIsConfirmOpen(true);
    });
  };

  return (
    <Dialog
      open={openDialogStopMntor}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialogStopMntor}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <div className="pt-2">
          <p className="flex items-center justify-center gap-1 mt-3 font-sans text-l antialiased font-normal leading-normal text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 -mt-px"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              ></path>
            </svg>
            Se detendrá la monitorización en el laboratorio {selectedLab}, estás
            seguro?
          </p>
        </div>
      </DialogContent>
      <DialogActions className="mb-4 mr-3">
        <Button
          type="button"
          className="big ui basic button border"
          onClick={handleCloseDialogStopMntor}
        >
          No
        </Button>
        <Button
          type="button"
          className="big ui basic button border"
          onClick={handleClickSMonitor}
        >
          Si
        </Button>
      </DialogActions>
    </Dialog>
  );
}
