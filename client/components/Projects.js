import React from "react";
import ProjectRow from "./ProjectRow";

const projects = [
  {
    id: 1,
    name: "Bitcoin",
    website: "www.bitcoin.com",
    links: [
      { name: "Cool Dashboard 1", url: "www.link1.com" },
      { name: "Cool Dashboard 2", url: "www.link2.com" },
      { name: "Cool Dashboard 3", url: "www.link3.com" },
    ],
    logo: "/images/btc.png",
    symbol: "BTC",
  },
  {
    id: 2,
    name: "Solana",
    website: "www.solana.com",
    links: [
      { name: "Cool Dashboard 4", url: "www.link4.com" },
      { name: "Cool Dashboard 5", url: "www.link5.com" },
    ],
    logo: "/images/sol.png",
    symbol: "SOL",
  },
];

export default function Projects() {
  return (
    <div className="bg-[#F9F8F8] w-screen">
      <div className="w-screen flex justify-center bg-[#F9F8F8]">
        <table className="table-auto mt-10">
          <thead className="border-t border-b border-gray-300 rounded">
            <tr className="font-medium text-right">
              <td className="p-3 text-center text-white">.</td>
              <td className="p-3 text-center">Logo</td>
              <td className="p-3">Symbol</td>
              <td className="p-3">Project Name</td>
              <td className="p-3">Website</td>
              <td className="p-3"># Links</td>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              return <ProjectRow key={project.id} project={project} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
