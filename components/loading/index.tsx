import React from "react";
import ReactDOM from "react-dom";
const Loading = () => {
  if (typeof window === "object") {
    return ReactDOM.createPortal(
      <div className="overlay__inner">
        <div className="overlay__content">
          <span className="spinner"></span>
        </div>
      </div>,
      document.getElementById("overlays") as HTMLElement
    );
  }
  return <p>Loading....</p>;
};
export default Loading;
