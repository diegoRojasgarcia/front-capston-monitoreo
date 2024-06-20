import { centosDirectory } from "@/api";
import React, { useEffect, useState } from "react";
import LatestImage from "../LatestImage/LatestImage";
import DirectoryLabsViewer from "../DirectoryLabsViewer.js/DirectoryLabsViewer";

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
        const baseURL = "http://192.168.100.25/imagenes";
        const basePath = `${baseURL}/${lab.nombre}/${currentDate}/${actividad.nombre}`;
        const newPaths = pcss.map((computer) => ({
          name: computer,
          path: `${basePath}/${computer.nombre}`,
        }));
        setPaths(newPaths);
      } catch (error) {
        console.error("Error fetching computers:", error);
      }
    };

    fetchComputers();
  }, [actividad]);

  useEffect(() => {
    const selectRandomPaths = () => {
      const shuffled = [...paths].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 12);
      setSelectedPaths(selected);
    };
    // Seleccionar rutas inmediatamente y luego cada minuto
    selectRandomPaths();
    const intervalId = setInterval(selectRandomPaths, 60000);
    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [paths]);

  return (
    <>
      <div>
        <h1 className="text-2xl mb-4 text-white">Live View - {lab.nombre}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedPaths.map((computer, index) => (
            <>
              <div
                key={index}
                className="w-[426px] h-[240px] bg-gray-200 p-4 rounded-lg shadow-md"
              >
                <p>{computer.name.nombre}</p>
                {selectedPaths && <DirectoryLabsViewer path={computer.path} />}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default LabsViewer;
