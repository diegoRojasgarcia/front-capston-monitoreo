import { Button } from "semantic-ui-react";
import styles from "./LabsLayout.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { centosDirectory } from "@/api";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const Fechas = [];

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function LabsLayout({ lab }) {
  const { accessToken, startMonitor, stopMonitor, isMonitoring } = useAuth();
  const router = useRouter();
  const [openDialogMntor, setOpenDialogMntor] = React.useState(false);
  const [showButtonStopMntor, setShowButtonStopMntor] = React.useState(false);

  //para las fechas
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  var ismonitoring = localStorage.getItem("Ismonitoring");
  var labmonitoring = localStorage.getItem("Labmonitoring");
  var selectedLab = localStorage.getItem("selectedLabs");

  React.useEffect(() => {
    const showButtomStop = ismonitoring && labmonitoring === selectedLab;
    setShowButtonStopMntor(showButtomStop);
  }, [selectedLab]);

  const cDirectory = new centosDirectory();

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.
      const dates = await cDirectory.getDates(selectedLab);
      if (active) {
        setOptions([...dates]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleOpenDialogMntor = () => {
    setOpenDialogMntor(true);
  };

  const handleCloseDialogMntor = () => {
    setOpenDialogMntor(false);
  };

  //open dialog
  const handleClickMonitor = () => {
    // cDirectory.createFile({ lab: lab }).then((response) => {
    //   console.log("archivo enviado");
    // });
    startMonitor(lab);
    setShowButtonStopMntor(true);
    setOpenDialogMntor(false);
  };

  const handleClickSMonitor = () => {
    // cDirectory.deleteFile({ lab: lab }).then((response) => {
    //   console.log("archivo eliminado");
    // });
    stopMonitor();
    setShowButtonStopMntor(false);
  };

  if (!accessToken) {
    router.push("/");
    return null;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className={styles.topBar}>
          <div className="flex inline-flexbox">
            <Autocomplete
              id="asynchronous-demo"
              value={value || null}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              sx={{
                width: 200,
                marginRight: 2,
              }}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(option, value) =>
                option.title === value.title
              }
              getOptionLabel={(option) => option.nombre}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Fecha"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />

            <Button onClick={handleOpenDialogMntor}>Monitorear</Button>
            <Dialog
              open={openDialogMntor}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialogMntor}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Comenzará la monitorización en el laboratorio {lab}, estás
                  seguro?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogMntor}>Salir</Button>
                <Button onClick={handleClickMonitor}>Monitorear</Button>
              </DialogActions>
            </Dialog>
            {showButtonStopMntor ? (
              <Button onClick={handleClickSMonitor}>Detener Monitoreo</Button>
            ) : null}
          </div>
        </div>

        <div className={styles.block}>{lab}</div>
      </div>
    </>
  );
}
