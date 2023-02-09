import React from "react";

export default function Spinner() {
  return (
    <div className="text-center p-4 mt-10 flex justify-center mx-auto">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
    </div>
  );
}
