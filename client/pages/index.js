import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
// import Projects from "../components/Projects";
import ProjectRow from "../components/ProjectRow";
import { GET_ACTIVE_PROJECTS } from "../queries/projectQueries";
import { createApolloClient } from "../utils/apolloClient";

export async function getServerSideProps(context) {
  const client = createApolloClient();
  context.client = client;

  const { data } = await client.query({
    query: GET_ACTIVE_PROJECTS,
  });

  return {
    props: {
      activeProjects: data.activeProjects,
    },
  };
}

export default function Home({ activeProjects }) {
  return (
    <div className="w-screen relative">
      <NavBar />
      <Hero />
      <div className="w-screen h-screen flex justify-center overflow-y-auto overflow-x-hidden">
        {/* <Projects /> */}

        {activeProjects?.length > 0 ? (
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
                  {activeProjects?.map((project) => {
                    return <ProjectRow key={project.id} project={project} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>No Projects</p>
        )}
      </div>
    </div>
  );
}
