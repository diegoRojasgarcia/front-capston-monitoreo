import React from "react";
import { centosDirectory } from "@/api";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
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

export function AutocompleteActividad({
  openActividades,
  setOpenActividades,
  valueActividad,
  setValueActividad,
  inputValuePcs,
  setInputValueActividad,
  valueLaboratorio,
}) {
  const [actividades, setActividades] = React.useState([]);
  const loadingActividades = openActividades && actividades.length === 0;

  const cDirectory = new centosDirectory();

  //fetch pcs open autocomplete
  React.useEffect(() => {
    let active = true;
    const currentDate = getCurrentDate();

    if (!loadingActividades) {
      return undefined;
    }

    (async () => {
      await sleep(500); // For demo purposes.
      var actividadess = [];
      if (currentDate && valueLaboratorio) {
        actividadess = await cDirectory.getLastActividad(
          valueLaboratorio.nombre,
          currentDate
        );
      }

      //validar que valueFecha tenga valor!!!
      if (active) {
        setActividades([...actividadess]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingActividades]);
  //recarga de datos
  React.useEffect(() => {
    if (!openActividades) {
      setActividades([]);
    }
  }, [openActividades]);

  return (
    <Autocomplete
      value={valueActividad || null}
      onChange={(event, newValue) => {
        setValueActividad(newValue);
      }}
      inputValue={inputValuePcs}
      onInputChange={(event, newInputValue) => {
        setInputValueActividad(newInputValue);
      }}
      id="asynchronous-demo"
      sx={{
        width: 160,
        marginRight: 2,
      }}
      open={openActividades}
      onOpen={() => {
        setOpenActividades(true);
      }}
      onClose={() => {
        setOpenActividades(false);
      }}
      getOptionLabel={(option) => option.nombre}
      options={actividades}
      loading={loadingActividades}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Actividad"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loadingActividades ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
