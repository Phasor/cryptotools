import React from "react";

export default function NavBar() {
  return (
    <nav className="flex justify-end w-screen bg-yellow-600">
      <ul className="flex p-2 space-x-5 font-medium">
        <li className="hover:border-b hover:border-black">About</li>
        <li className="hover:border-b hover:border-black">Suggest a Link</li>
      </ul>
    </nav>
  );
}
