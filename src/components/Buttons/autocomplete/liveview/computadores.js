import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { centosDirectory } from "@/api";
import { TextField } from "@mui/material";

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son de 0 a 11
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export function AutocompletePcs({
  openPcs,
  setOpenPcs,
  valuePcs,
  setValuePcs,
  inputValuePcs,
  setInputValuePcs,
  valueActividad,
  valueLaboratorio,
}) {
  const [pcs, setPcs] = React.useState([]);
  const loadingPcs = openPcs && pcs.length === 0;
  const cDirectory = new centosDirectory();
  var selectedLab = localStorage.getItem("selectedLabs");

  //fetch pcs open autocomplete
  React.useEffect(() => {
    let active = true;
    const currentDate = getCurrentDate();

    if (!loadingPcs) {
      return undefined;
    }

    (async () => {
      await sleep(500); // For demo purposes.
      var pcss = [];
      if (currentDate && valueActividad && valueLaboratorio) {
        pcss = await cDirectory.getPcs(
          valueLaboratorio.nombre,
          currentDate,
          valueActividad.nombre
        );
      }

      //validar que valueFecha tenga valor!!!
      if (active) {
        setPcs([...pcss]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingPcs]);
  //recarga de datos
  React.useEffect(() => {
    if (!openPcs) {
      setPcs([]);
    }
  }, [openPcs]);

  return (
    <Autocomplete
      value={valuePcs || null}
      onChange={(event, newValue) => {
        setValuePcs(newValue);
      }}
      inputValue={inputValuePcs}
      onInputChange={(event, newInputValue) => {
        setInputValuePcs(newInputValue);
      }}
      id="asynchronous-demo"
      sx={{
        width: 160,
        marginRight: 2,
      }}
      open={openPcs}
      onOpen={() => {
        setOpenPcs(true);
      }}
      onClose={() => {
        setOpenPcs(false);
      }}
      getOptionLabel={(option) => option.nombre}
      options={pcs}
      loading={loadingPcs}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Computador"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loadingPcs ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
