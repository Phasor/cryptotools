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
    <div className="absolute top-0 left-0 w-[100%] h-[100%] flex justify-center items-center bg-gray-900 opacity-90">
      <div className="bg-white rounded-md p-2 z-[1000] opacity-100">
        <div>
          <a href="#" onClick={handleClose}>
            <button className="text-blue-600 font-medium">Close</button>
          </a>
        </div>
        <div>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
