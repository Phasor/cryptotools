import Head from "next/head";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
// import Projects from "../components/Projects";
import ProjectRow from "../components/ProjectRow";
import { GET_ACTIVE_PROJECTS } from "../queries/projectQueries";
import { createApolloClient } from "../utils/apolloClient";
import Footer from "../components/Footer";

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
    <div className="w-screen min-h-screen relative bg-[#F9F8F8] overflow-y-auto flex flex-col">
      <Head>
        <title>Crypto Project Statistics - crypto dashboards</title>
        <meta
          name="description"
          content="A list of curated data dashboards about each major crypto project so that you can do your own investment research for free."
        />
        <meta
          name="keywords"
          content="crypto, cryptocurrency, dashboards, projects, data, blockchain, bitcoin, ethereum"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Hero />

      {/* Table of Projects */}
      <main>
        <div className="flex flex-1 justify-center overflow-y-auto md:overflow-y-visible my-20">
          {activeProjects?.length > 0 ? (
            <div className="bg-[#F9F8F8] w-screen">
              <div className="w-screen flex justify-center bg-[#F9F8F8]">
                <table className="table-auto">
                  <thead className="border-t border-b border-gray-300 rounded align-top">
                    <tr className="font-medium text-right">
                      <td className="p-3 text-center text-white">.</td>
                      <td className="p-3 text-center">Logo</td>
                      <td className="p-3">Symbol</td>
                      <td className="p-3">Project Name</td>
                      <td className="p-3 hidden md:block">Website</td>
                      <td className="p-3"># Links</td>
                    </tr>
                  </thead>
                  <tbody className="">
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
      </main>

      <Footer />
    </div>
  );
}
