import { centosDirectory } from "@/api";
import React, { useEffect, useState } from "react";

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son de 0 a 11
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const LabsViewer = ({ lab, actividad }) => {
  const [paths, setPaths] = useState([]);
  const [selectedPaths, setSelectedPaths] = useState([]);

  const cDirectory = new centosDirectory();

  useEffect(() => {
    const fetchComputers = async () => {
      try {
        const currentDate = getCurrentDate();
        var pcss = [];
        if (currentDate && actividad && lab) {
          pcss = await cDirectory.getPcs(
            lab.nombre,
            currentDate,
            actividad.nombre
          );
        }
        //
        const basePath = `${lab.nombre}/${currentDate}/${actividad.nombre}`;
        const newPaths = pcss.map(
          (computer) => `${basePath}/${computer.nombre}`
        );
        setPaths(newPaths);
        console.log(newPaths);
      } catch (error) {
        console.error("Error fetching computers:", error);
      }
    };

    fetchComputers();
  }, [actividad]);

  useEffect(() => {
    const selectRandomPaths = () => {
      const shuffled = [...paths].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 9);
      setSelectedPaths(selected);
    };

    // Seleccionar rutas inmediatamente y luego cada minuto
    selectRandomPaths();
    const intervalId = setInterval(selectRandomPaths, 60000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [paths]);

  // useEffect(() => {
  //   if (actividad) {
  //     const currentDate = getCurrentDate();
  //     const newPath = `${lab.nombre}/${currentDate}/${actividad.nombre}`;
  //     setPath(newPath);
  //   }
  // }, [lab, actividad]);

  return (
    <>
      <div>Cargando Lab live view</div>
      <div>Arreglo de computadores</div>
      <ul>
        {selectedPaths.map((path, index) => (
          <li key={index}>{path}</li>
        ))}
      </ul>
    </>
  );
};

export default LabsViewer;
