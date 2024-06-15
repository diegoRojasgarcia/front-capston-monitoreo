import React, { useState, useEffect } from "react";

const LatestImage = ({ src }) => {
  const [imageSrc, setImageSrc] = useState(
    `${src}?timestamp=${new Date().getTime()}`
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setImageSrc(`${src}?timestamp=${new Date().getTime()}`);
    }, 4000); // Reload the image every 4 seconds
    return () => clearInterval(interval);
  }, [src]);

  useEffect(() => {
    setImageSrc(`${src}?timestamp=${new Date().getTime()}`);
  }, [src]);

  return (
    <div>
      <div className="p-2 h-screen overflow-hidden">
        <img
          src={imageSrc}
          alt="Latest"
          className="latest-image w-full h-5/6 object-contain"
        />
      </div>
    </div>
  );
};

export default React.memo(LatestImage);
