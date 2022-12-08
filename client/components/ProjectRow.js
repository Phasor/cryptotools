import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function ProjectRow({ project }) {
  return (
    <tr className="border-b border-gray-200  hover:bg-blue-100 cursor-pointer">
      <td className="p-5">
        <ChevronDownIcon className="h-6 w-6 transform hover:scale-110 text-gray-500" />
      </td>
      <td className="text-center p-3">
        <img src={project.logo} alt="" className="transform hover:scale-110" />
      </td>
      <td className="text-right p-3">{project.symbol}</td>
      <td className="text-right p-3">{project.name}</td>
      <td className="text-right p-3">{project.website}</td>
      <td className="text-right p-3">{project.links.length}</td>
    </tr>
  );
}
