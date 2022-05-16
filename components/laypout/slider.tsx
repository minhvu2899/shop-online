import Image from "next/image";
import React from "react";

const Slider = () => {
  return (
    <div>
      <Image
        width={2000}
        height={1000}
        src="/sliders/slider1.png"
        alt="Slider 1"
      />
    </div>
  );
};

export default Slider;
