import Image from "next/image";
import React from "react";
import ReactDOM from "react-dom";
const Loading = () => {
  // return (
  //   <div className="modal">
  //     <div className="loading">
  //       <Image
  //         src="/icons/Spinner.gif"
  //         width="100"
  //         height="100"
  //         alt="Loading..."
  //       ></Image>
  //     </div>
  //   </div>
  // );
  if (typeof window === "object") {
    // Check if document is finally loaded
    //  document.addEventListener("DOMContentLoaded", function () {
    //      alert('Finished loading')
    //    });
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
  // return ReactDOM.createPortal(
  //   <div className="modal">
  //     <div className="modal">
  //       <div className="loading">
  //         <Image
  //           src="/icons/Spinner.gif"
  //           width="100"
  //           height="100"
  //           alt="Loading..."
  //         ></Image>
  //       </div>
  //     </div>
  //   </div>,
  //   document.getElementById("notifications") as HTMLElement
  // );
};
export default Loading;
