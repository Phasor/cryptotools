import React from "react";
import ProjectRow from "./ProjectRow";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (error) return <p>Something went wrong</p>;
  if (loading) return <Spinner />;

  return (
    <>
      {data.projects.length > 0 ? (
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
                {data.projects.map((project) => {
                  return <ProjectRow key={project.id} project={project} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
