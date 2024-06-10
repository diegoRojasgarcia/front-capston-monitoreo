import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

export function VideoComp({ valueFecha, valueActividad, valuePcs }) {
  const [path, setPath] = useState("");
  const [files, setFiles] = useState([]);
  const [mp4Files, setMp4Files] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    if (valuePcs) setPath(valueFecha + "/" + valueActividad + "/" + valuePcs);
  }, [valueFecha, valueActividad, valuePcs]);

  useEffect(() => {
    if (path) {
      fetchFiles(path);
    }
  }, [path]);

  const fetchFiles = async (currentPath) => {
    try {
      const baseURL = "http://192.168.100.25/videos/";
      console.log(`Fetching files from: ${baseURL}${currentPath}`);
      const response = await fetch(`${baseURL}${currentPath}`);
      console.log("Response received:", response.data);

      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, "text/html");
      const links = Array.from(doc.querySelectorAll("a"))
        .map((link) => link.getAttribute("href"))
        .filter((href) => href !== "../");

      console.log("Parsed links:", links);

      // Separate directories and .mp4 files
      const dirs = links.filter((link) => link.endsWith("/"));
      const mp4s = links.filter((link) => link.endsWith(".mp4"));

      setFiles(dirs);
      setMp4Files(mp4s);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const playVideo = (videoFile) => {
    const baseURL = "http://192.168.100.25/videos";
    setCurrentVideo(`${baseURL}${path}${videoFile}`);
  };

  return (
    <div>
      {mp4Files.length > 0 && (
        <div>
          <h2>MP4 Files</h2>
          <ul>
            {mp4Files.map((file) => (
              <li key={file}>
                <button onClick={() => playVideo(file)}>{file}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {currentVideo && (
        <div>
          <h2>Playing: {currentVideo}</h2>
          <video width="640" height="480" controls>
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}{" "}
    </div>
  );
}
