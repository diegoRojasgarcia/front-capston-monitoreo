import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { centosDirectory } from "@/api";
import { TextField } from "@mui/material";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export function AutocompleteLaboratorio({
  openLaboratorios,
  setOpenLaboratorios,
  valueLaboratorio,
  setValueLaboratorio,
  inputValueLaboratorio,
  setInputValueLaboratorio,
}) {
  const [laboratorios, setLaboratorios] = React.useState([]);
  const loadingLaboratorios = openLaboratorios && laboratorios.length === 0;

  const cDirectory = new centosDirectory();

  //fetch fechas open autocomplete
  React.useEffect(() => {
    let active = true;

    if (!loadingLaboratorios) {
      return undefined;
    }

    (async () => {
      await sleep(500); // For demo purposes.
      const labs = await cDirectory.getLabsMonitoring();
      if (active) {
        setLaboratorios([...labs]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingLaboratorios]);
  //recarga de datos
  React.useEffect(() => {
    if (!openLaboratorios) {
      setLaboratorios([]);
    }
  }, [openLaboratorios]);

  return (
    <Autocomplete
      value={valueLaboratorio || null}
      onChange={(event, newValue) => {
        setValueLaboratorio(newValue);
      }}
      inputValue={inputValueLaboratorio}
      onInputChange={(event, newInputValue) => {
        setInputValueLaboratorio(newInputValue);
      }}
      id="asynchronous-demo"
      sx={{
        width: 160,
        marginRight: 2,
      }}
      open={openLaboratorios}
      onOpen={() => {
        setOpenLaboratorios(true);
      }}
      onClose={() => {
        setOpenLaboratorios(false);
      }}
      getOptionLabel={(option) => option.nombre}
      options={laboratorios}
      loading={loadingLaboratorios}
      renderInput={(params) => (
        <TextField
          {...params}
          label="laboratorio"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loadingLaboratorios ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
