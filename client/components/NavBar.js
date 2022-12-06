import React from "react";

export default function NavBar() {
  return (
    <nav className="flex justify-end w-screen p-2">
      <ul className="flex p-2 space-x-5 font-medium">
        <li className="text-lg border border-gray-700 cursor-pointer py-2 px-3 rounded-sm hover:bg-gray-800 hover:bg-opacity-5">
          About
        </li>
        <li className="text-lg border border-gray-700 cursor-pointer py-2 px-3 rounded-sm hover:bg-gray-800 hover:bg-opacity-5">
          Suggest a Link
        </li>
      </ul>
    </nav>
  );
}
