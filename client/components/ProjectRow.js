import React from "react";

export default function ProjectRow({ project }) {
  return (
    <tr>
      <td>{project.name}</td>
      <td>{project.website}</td>
      <td>{project.links.length}</td>
    </tr>
  );
}
