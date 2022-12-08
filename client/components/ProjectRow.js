import React, { useState } from "react";
import { ChevronDownIcon, LinkIcon } from "@heroicons/react/24/solid";

export default function ProjectRow({ project }) {
  const [showLinks, setShowLinks] = useState(false);
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <>
      <tr
        className="border-b border-gray-200  hover:bg-blue-100 cursor-pointer"
        onClick={handleShowLinks}
      >
        <td className="p-5">
          <ChevronDownIcon className="h-6 w-6 transform hover:scale-110 text-gray-500" />
        </td>
        <td className="text-center p-3">
          <img
            src={project.logo}
            alt=""
            className="transform hover:scale-110"
          />
        </td>
        <td className="text-right p-3">{project.symbol}</td>
        <td className="text-right p-3">{project.name}</td>
        <td className="text-right p-3">{project.website}</td>
        <td className="text-right p-3">{project.links.length}</td>
      </tr>

      {/* Link Box */}
      {showLinks && (
        <tr className="">
          <td colSpan={6}>
            <div className="flex space-x-3 p-2 items-center ">
              <LinkIcon className="h-4 w-4" />
              <p className=" font-medium">Dashboard Links</p>
            </div>
            <ol className="list-decimal">
              {project.links.map((link) => {
                return (
                  <li className="p-1 ml-10">
                    <a
                      href={link.url}
                      target="_blank"
                      className="text-blue-600 hover:underline active:text-blue-800 visited:text-purple-600 cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ol>
          </td>
        </tr>
      )}
    </>
  );
}
