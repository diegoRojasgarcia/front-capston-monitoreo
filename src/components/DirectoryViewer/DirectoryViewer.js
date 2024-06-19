import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import LatestImage from "../LatestImage/LatestImage.js";

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son de 0 a 11
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DirectoryViewer = ({ lab, actividad, currentPC }) => {
  const [path, setPath] = useState("");
  const [latestImageSrc, setLatestImageSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [latestFile, setLatestFile] = useState("");

  useEffect(() => {
    if (currentPC) {
      const currentDate = getCurrentDate();
      const newPath = `${lab.nombre}/${currentDate}/${actividad.nombre}/${currentPC.nombre}/`;
      setPath(newPath);
    }
  }, [lab, actividad, currentPC]);

  const fetchFoldersAndLatestImage = useCallback(async () => {
    if (!path) return;

    try {
      const baseURL = "http://192.168.100.25/imagenes/";
      console.log(`Fetching files from: ${baseURL}${path}`);
      const response = await axios.get(`${baseURL}${path}`);
      const files = response.data.filter(
        (item) =>
          item.type === "file" && /\.(jpg|jpeg|png|gif)$/i.test(item.name)
      );

      console.log(`Fetched files from: ${baseURL}${path}`);
      files.sort((a, b) => new Date(b.mtime) - new Date(a.mtime));

      if (files.length > 0) {
        const latestFile = files[0].name;
        setLatestFile(latestFile);
        setLatestImageSrc(`${baseURL}${path}${latestFile}`);
      } else {
        setLatestImageSrc("");
      }
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    fetchFoldersAndLatestImage();
    const interval = setInterval(fetchFoldersAndLatestImage, 4000); // Fetch the directory listing every 4 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [fetchFoldersAndLatestImage]);

  return <div>{latestImageSrc && <LatestImage src={latestImageSrc} />}</div>;
};

export default DirectoryViewer;
