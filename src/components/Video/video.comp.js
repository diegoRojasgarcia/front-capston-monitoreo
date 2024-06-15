import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

export function VideoComp({
  valueFecha,
  valueActividad,
  valuePcs,
  selectedLab,
}) {
  const [path, setPath] = useState("");
  const [files, setFiles] = useState([]);
  const [mp4Files, setMp4Files] = useState("");
  const [currentVideo, setCurrentVideo] = useState(null);
  const videoRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (valuePcs)
      setPath(
        selectedLab +
          "/" +
          valueFecha +
          "/" +
          valueActividad +
          "/" +
          valuePcs +
          "/"
      );
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
      const response = await axios(`${baseURL}${currentPath}`);
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

      console.log(mp4s[0]);
      const namevide = mp4s[0];

      setFiles(dirs);
      setMp4Files(mp4s[0]);

      setCurrentVideo(`${baseURL}${path}${namevide}`);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const nextFrame = () => {
    if (videoRef.current) {
      const newTime = (currentFrame + 1) / 5;
      videoRef.current.currentTime = newTime;
      setCurrentFrame(currentFrame + 1);
    }
  };

  const prevFrame = () => {
    if (videoRef.current && currentFrame > 0) {
      const newTime = (currentFrame - 1) / 5;
      videoRef.current.currentTime = newTime;
      setCurrentFrame(currentFrame - 1);
    }
  };

  return (
    <div className="text-white">
      {currentVideo && (
        <div>
          <video ref={videoRef} width="1240" height="720" controls>
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <div>
            <button onClick={prevFrame}>Previous Frame</button>
            <button onClick={nextFrame}>Next Frame</button>
          </div> */}
        </div>
      )}{" "}
    </div>
  );
}
