import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ProjectRow from "../components/ProjectRow";
import NavBar from "../components/NavBar";
import AddProjectButton from "../components/AddProjectButton";
import useAuth from "../utils/useAuth";
import { useRouter } from "next/router";


export default function admin() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    const checkAuth = async () => {
      const isLoggedIn = await useAuth();
      setIsLoggedIn(isLoggedIn);
      console.log(`isLoggedIn: ${isLoggedIn}`)
      if(!isLoggedIn){
        router.push('/login');
      }
    }
    checkAuth();
  },[])

  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (error) return <p>Something went wrong</p>;
  if (!isLoggedIn || loading) return (
    <div className="flex justify-center items-center min-h-screen w-screen">
      <p>Loading...</p>;
    </div>
  )

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="bg-[#232323] w-screen min-h-screen">
          <NavBar />
          <div className="w-screen flex justify-center">
            <div className="flex flex-col">
              {/* Add new project button */}
              <AddProjectButton />

              {/* List of existing projects */}
              <table className="table-auto  max-w-[70%] whitespace-nowrap">
                <thead className="border-t border-b border-gray-300 rounded">
                  <tr className="font-medium text-right">
                    <td className="p-3 text-center text-[#232323]">.</td>
                    <td className=" text-white p-3 text-center">Logo</td>
                    <td className=" text-white p-3">Symbol</td>
                    <td className=" text-white p-3">Project Name</td>
                    <td className=" text-white p-3">Website</td>
                    <td className=" text-white p-3"># Links</td>
                  </tr>
                </thead>
                <tbody>
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

