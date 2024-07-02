import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { centosDirectory } from "@/api";
import { TextField } from "@mui/material";
import { red } from "@mui/material/colors";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export function AutocompleteFecha({
  openFechas,
  setOpenFechas,
  valueFecha,
  setValueFecha,
  inputValueFecha,
  setInputValueFecha,
}) {
  const [fechas, setFechas] = React.useState([]);
  const loadingFechas = openFechas && fechas.length === 0;
  var selectedLab = JSON.parse(localStorage.getItem("selectedLabs"));

  const cDirectory = new centosDirectory();

  //fetch fechas open autocomplete
  React.useEffect(() => {
    let active = true;

    if (!loadingFechas) {
      return undefined;
    }

    (async () => {
      await sleep(500); // For demo purposes.
      const dates = await cDirectory.getDates(selectedLab.nombre);
      if (active) {
        setFechas([...dates]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingFechas]);
  //recarga de datos
  React.useEffect(() => {
    if (!openFechas) {
      setFechas([]);
    }
  }, [openFechas]);

  return (
    <Autocomplete
      value={valueFecha || null}
      onChange={(event, newValue) => {
        setValueFecha(newValue);
      }}
      inputValue={inputValueFecha}
      onInputChange={(event, newInputValue) => {
        setInputValueFecha(newInputValue);
      }}
      id="asynchronous-demo"
      sx={{
        width: 160,
        marginRight: 2,
        bordercolor: "#2196F3",
      }}
      open={openFechas}
      onOpen={() => {
        setOpenFechas(true);
      }}
      onClose={() => {
        setOpenFechas(false);
      }}
      getOptionLabel={(option) => option.nombre}
      options={fechas}
      loading={loadingFechas}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Fechas"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loadingFechas ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
