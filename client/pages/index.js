import Head from "next/head";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { getActiveProjects } from '../queries/projectQueries';
import ProjectCard from "../components/ProjectCard";
import Script from "next/script";
import SearchBox from "../components/SearchBox";

export default function Home() {

  function logDataType() {
    console.log(typeof data);
}
  
  // fetch the data
  const { status, data, error } = getActiveProjects();

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (status === "error") {
    return <div className="text-center">Error: {error.message}</div>;
  }

  if (status ==="success") {
    return (
    <div className="w-screen min-h-screen relative bg-[#F9F8F8] overflow-y-auto flex flex-col">
      <Script src="https://kit.fontawesome.com/b24cab7e32.js" crossorigin="anonymous"></Script>
      <Head>
        <title>Crypto Tools List</title>
        <meta
          name="description"
          content="Free crypto dashboards about each major coin so that you can do your own research and decide the best crypto to buy today."
        />
        <meta
          name="keywords"
          content="crypto dashboard, dashboard crypto, crypto data analytics, cryptocurrency research, blockchain, bitcoin, ethereum"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Hero />

      <main className="flex flex-col items-center mb-20">
        <div className="w-[75%]">
          <SearchBox/>
        </div>
        <div className="max-w-[80%] grid grid-cols-1 md:grid-cols-4 md: gap-20 m-6">
          {data.data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )}

}
