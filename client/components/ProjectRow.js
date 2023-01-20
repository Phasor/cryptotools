import React, { useState } from "react";
import {
  ChevronDownIcon,
  LinkIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectButton from "./EditProjectButton";
import DeleteLinkButton from "./DeleteLinkButton";
import AddLinkButton from "./AddLinkButton";
import Link from "next/link";
import ActiveButton from "./ActiveButton";
import InactiveButton from "./InactiveButton";
import ActiveLinkButton from "./ActiveLinkButton";
import InactiveLinkButton from "./InactiveLinkButton";

export default function ProjectRow({ project, admin }) {
  const [showLinks, setShowLinks] = useState(false);
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <>
      <tr
        className={
          admin
            ? "border-b border-gray-200  hover:bg-gray-800 align-middle"
            : "border-b border-gray-200  hover:bg-blue-100 align-middle"
        }
      >
        <td className="p-1 sm:p-5 cursor-pointer" onClick={handleShowLinks}>
          {admin ? (
            <ChevronDownIcon className="h-6 w-6 transform hover:scale-110 text-white" />
          ) : (
            <ChevronDownIcon className="h-6 w-6 transform hover:scale-110 text-gray-500" />
          )}
        </td>
        <td
          className="text-center p-3 cursor-pointer"
          onClick={handleShowLinks}
        >
          {/* <img
            src={project.image ? project.image : "/images/missing.jpg"}
            alt={project.name ? `${project.name} icon` : ""}
            className="transform hover:scale-110 h-10 w-10 rounded-full object-cover"
          /> */}

          <Image
            src={project.image ? project.image : "/images/missing.jpg"}
            alt={project.name ? `${project.name} icon` : ""}
            className="transform hover:scale-110 h-10 w-10 rounded-full object-cover"
            width={20}
            height={20}
            sizes={`(max-width: 20px) 20px, 20px`}
          />
        </td>
        {/* symbol */}
        {admin ? (
          <td
            className="text-center p-3 cursor-pointer text-white"
            onClick={handleShowLinks}
          >
            {project.symbol}
          </td>
        ) : (
          <td
            className="text-center p-3 cursor-pointer"
            onClick={handleShowLinks}
          >
            {project.symbol}
          </td>
        )}
        {/* name */}
        {admin ? (
          <td
            className="text-right p-3 cursor-pointer text-white"
            onClick={handleShowLinks}
          >
            {project.name}
          </td>
        ) : (
          <td
            className="text-right p-3 cursor-pointer"
            onClick={handleShowLinks}
          >
            {project.name}
          </td>
        )}
        {/* website */}
        {admin ? (
          <td
            className="text-right p-3 cursor-pointer hidden md:table-cell h-full text-white"
            onClick={handleShowLinks}
          >
            {project.website}
          </td>
        ) : (
          <td
            className="text-right p-3 cursor-pointer hidden md:table-cell h-full"
            onClick={handleShowLinks}
          >
            {project.website}
          </td>
        )}
        {/* # of links */}
        {admin ? (
          <td
            className="text-center p-3 cursor-pointer text-white"
            onClick={handleShowLinks}
          >
            {project.links.length}
          </td>
        ) : (
          <td
            className="text-center p-3 cursor-pointer"
            onClick={handleShowLinks}
          >
            {project.links.length}
          </td>
        )}

        {/* admin buttons */}
        {admin && (
          <td className="p-5 flex space-x-4 items-center">
            <DeleteProjectButton project={project} />
            <EditProjectButton project={project} />
            <AddLinkButton project={project} />
            {project.active ? (
              <ActiveButton project={project} />
            ) : (
              <InactiveButton project={project} />
            )}
          </td>
        )}
      </tr>

      {/* Link Box */}
      {showLinks && (
        <tr className="">
          <td colSpan={6}>
            <div className="flex space-x-3 p-2 items-center ">
              <LinkIcon className={admin ? "h-4 w-4 text-white" : "h-4 w-4"} />
              <p className={admin ? "font-medium text-white" : "font-medium"}>
                Dashboard Links
              </p>
            </div>
            <ol className="list-decimal">
              {project.links.map((link) => {
                return (
                  <li
                    className={admin ? "p-1 ml-10 text-white" : "p-1 ml-10"}
                    key={link.id}
                  >
                    <div className="flex space-x-5 items-center">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline active:text-blue-800 visited:text-purple-600 cursor-pointer"
                      >
                        {link.name}
                      </a>
                      {admin && (
                        <>
                          <DeleteLinkButton link={link} />
                          <Link href={`/link/${link.id}`}>
                            <PencilIcon
                              className="h-4 w-4 transform hover:scale-110 text-white "
                              title="Edit Link"
                            />
                          </Link>
                          {link.active ? (
                            <ActiveLinkButton link={link} />
                          ) : (
                            <InactiveLinkButton link={link} />
                          )}
                        </>
                      )}
                    </div>
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
