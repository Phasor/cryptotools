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
    <div className="w-screen min-h-screen relative bg-[#F9F8F8] overflow-y-auto">
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
      <SearchBox/>

      {/* Project List */}
      <div className="max-w-6xl p-4 md:p-0 items-center mx-auto mt-10 mb-20 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-10">
        {data.data.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <Footer />
    </div>
  )}

}
