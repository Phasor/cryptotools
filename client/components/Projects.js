import React from "react";
import ProjectRow from "./ProjectRow";

const project = {
  name: "Bitcoin",
  website: "www.bitcoin.com",
  links: ["www.link1.com", "www.link2.com", "www.link3.com"],
  logo: "/images/btc.png",
  symbol: "BTC",
};

export default function Projects() {
  return (
    <div className="absolute top-[600px]">
      <table>
        <thead className="border-t border-b border-gray-300 rounded">
          <tr className="font-medium text-right">
            <td className="p-3 text-center">Logo</td>
            <td className="p-3">Symbol</td>
            <td className="p-3">Project Name</td>
            <td className="p-3">Website</td>
            <td className="p-3"># Links</td>
          </tr>
        </thead>
        <tbody>
          <ProjectRow project={project} />
        </tbody>
      </table>
    </div>
  );
}
