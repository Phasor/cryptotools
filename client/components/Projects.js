import React from "react";
import ProjectRow from "./ProjectRow";

const project = {
  name: "Solana",
  website: "www.solana.com",
  links: ["www.link1.com", "www.link2.com", "www.link3.com"],
};

export default function Projects() {
  return (
    <div className="absolute top-[600px]">
      <table>
        <thead>
          <tr>
            <td>Project Name</td>
            <td>Website</td>
            <td># Links</td>
          </tr>
        </thead>
        <tbody>
          <ProjectRow project={project} />
        </tbody>
      </table>
    </div>
  );
}
