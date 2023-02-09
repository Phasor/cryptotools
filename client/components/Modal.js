import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ show, onClose, children }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className="absolute top-0 left-0 w-full h-screen min-h-full flex justify-center items-center bg-gray-900 opacity-100">
      <div className="bg-white rounded-md p-2 z-[1000] w-full sm:max-w-[80%] md:max-w-[40%]">
        <div>
          <a href="#" onClick={handleClose}>
            <button className="text-blue-600 font-medium">Close</button>
          </a>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  ) : (
    <></>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
