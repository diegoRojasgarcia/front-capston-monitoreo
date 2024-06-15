import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import LatestImage from "../LatestImage/LatestImage.js";

const DirectoryViewer = ({ lab, actividad, currentDate, currentPC }) => {
  const [path, setPath] = useState("");
  const [latestImageSrc, setLatestImageSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [latestFile, setLatestFile] = useState("");

  useEffect(() => {
    if (currentPC) {
      const newPath = `${lab}/${currentDate}/${actividad}/${currentPC}/`;
      setPath(newPath);
    }
  }, [lab, actividad, currentDate, currentPC]);

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
