import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import LatestImage from "../LatestImage/LatestImage.js";
import LatesImageView from "../LatesImageView/LatesImageView.js";
import { ENV } from "@/utils";

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son de 0 a 11
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DirectoryLabsViewer = ({ path }) => {
  const [latestImageSrc, setLatestImageSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [latestFile, setLatestFile] = useState("");

  const fetchFoldersAndLatestImage = useCallback(async () => {
    if (!path) return;

    try {
      const username = "admin"; // reemplaza con tu nombre de usuario
      const password = "Ty22-Op4a"; // reemplaza con tu contraseña
      const token = btoa(`${username}:${password}`);

      const response = await axios.get(`${path}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      const files = response.data.filter(
        (item) =>
          item.type === "file" && /\.(jpg|jpeg|png|gif)$/i.test(item.name)
      );
      files.sort((a, b) => new Date(b.mtime) - new Date(a.mtime));

      if (files.length > 0) {
        const latestFile = files[0].name;
        setLatestFile(latestFile);
        setLatestImageSrc(`${path}/${latestFile}`);
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

  return <>{latestImageSrc && <LatesImageView src={latestImageSrc} />}</>;
};

export default DirectoryLabsViewer;
