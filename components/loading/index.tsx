import Image from "next/image";
import React from "react";
import ReactDOM from "react-dom";
const Loading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="modal">
      <div className="loading">
        <Image
          src="/icons/Spinner.gif"
          width="100"
          height="100"
          alt="Loading..."
        ></Image>
      </div>
    </div>
  );
};
export default Loading;
