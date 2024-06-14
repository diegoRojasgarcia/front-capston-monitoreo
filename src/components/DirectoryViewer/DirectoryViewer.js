import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import LatestImage from "../LatestImage/LatestImage.js";

const DirectoryViewer = ({ lab, actividad, currentDate, currentPC }) => {
  const [path, setPath] = useState([]);
  const [latestImageSrc, setLatestImageSrc] = useState(null);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentPC)
      setPath(
        lab + "/" + currentDate + "/" + actividad + "/" + currentPC + "/"
      );
  }, [currentPC]);

  console.log(path);

  const fetchFoldersAndLatestImage = useCallback(async () => {
    try {
      //   const response = await axios.get(
      //     `http://192.168.100.25/imagenes/${path.join("/")}/`,
      //     { headers: { Accept: "application/json" } }
      //   );
      //   console.log("Directory JSON:", response.data); // Log the directory JSON
      const baseURL = "http://192.168.100.25/imagenes/";
      console.log(`Fetching files from: ${baseURL}${path}`);
      const response = await axios(`${baseURL}${path}`);
      const files = response.data.filter(
        (item) =>
          item.type === "file" && /\.(jpg|jpeg|png|gif)$/i.test(item.name)
      );
      const folders = response.data.filter((item) => item.type === "directory");

      files.sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
      if (files.length > 0) {
        const latestFile = files[0].name;
        const newImageSrc = `http://192.168.100.25/imagenes/${path.join(
          "/"
        )}/${latestFile}`;
        setLatestImageSrc(newImageSrc);
      }
      setFolders(folders.map((folder) => folder.name));
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
  }, [path, fetchFoldersAndLatestImage]);

  return <div>{latestImageSrc && <LatestImage src={latestImageSrc} />}</div>;
};

export default DirectoryViewer;
