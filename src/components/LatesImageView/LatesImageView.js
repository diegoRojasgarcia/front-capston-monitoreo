import React, { useState, useEffect } from "react";

const LatestImageView = ({ src }) => {
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
    <div className="">
      <img src={imageSrc} alt="Latest" className="latest-image" />
    </div>
  );
};

export default React.memo(LatestImageView);
