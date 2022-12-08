import React from "react";

export default function ProjectRow({ project }) {
  return (
    <tr>
      <td className="text-center p-3">
        <img src={project.logo} alt="" />
      </td>
      <td className="text-right p-3">{project.symbol}</td>
      <td className="text-right p-3">{project.name}</td>
      <td className="text-right p-3">{project.website}</td>
      <td className="text-right p-3">{project.links.length}</td>
    </tr>
  );
}
