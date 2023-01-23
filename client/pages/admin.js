import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectRow from "../components/ProjectRow";
import NavBar from "../components/NavBar";
import AddProjectButton from "../components/AddProjectButton";
import useAuth from "../utils/useAuth";
import { useRouter } from "next/router";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isLoggedIn = useAuth();
    setIsLoggedIn(isLoggedIn);
    // console.log(`isLoggedIn: ${isLoggedIn}`);
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (error) return <p>Something went wrong</p>;
  if (!isLoggedIn || loading)
    return (
      <div className="flex justify-center items-center min-h-screen w-screen">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="bg-[#232323] w-screen min-h-screen">
          <NavBar />
          <div className="w-screen flex flex-1 justify-center">
            <div className="flex flex-col mt-20 ml-5">
              {/* Add new project button */}
              <AddProjectButton />

              {/* List of existing projects */}
              <table className="table-auto max-w-[70%] whitespace-nowrap">
                <thead className="border-t border-b border-gray-300 text-center">
                  <tr className="font-medium text-right">
                    <th className="md:p-3 text-center text-[#232323] align-middle">.</th>
                    <th className=" text-white p-3 text-center align-middle">Logo</th>
                    <th className=" text-white p-3 hidden md:table-cell h-full align-middle">Symbol</th>
                    <th className=" text-white md:p-3 align-middle">Project Name</th>
                    <th className=" text-white p-3 hidden md:table-cell h-full align-middle">Website</th>
                    <th className=" text-white p-3 hidden md:table-cell h-full align-middle"># Links</th>
                  </tr>
                </thead>
                <tbody className="">
                  {data.projects.map((project) => {
                    return (
                      <ProjectRow
                        key={project.id}
                        project={project}
                        admin={true}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
