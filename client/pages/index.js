import { useEffect, useState } from "react";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
// import { getActiveProjects } from "../queries/projectQueries";
import Script from "next/script";
import SearchBox from "../components/SearchBox";
import Link from "next/link";
import EmailList from "../components/EmailList";
import Spinner from "../components/Spinner";
import dbConnect from "../utils/dbConnect";
import Tool from "../models/Tool";

export default function Home({ projects }) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter the products based on the search value
  useEffect(() => {
    setFilteredProducts(
      projects.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.longDescription
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          product.shortDescription
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          product.category.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, projects]);

  return (
    <div className="w-screen min-h-screen relative bg-[#F9F8F8] overflow-y-auto">
      <Script
        src="https://kit.fontawesome.com/b24cab7e32.js"
        crossorigin="anonymous"
      ></Script>
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
      <EmailList />
      <SearchBox value={searchValue} setSearchValue={setSearchValue} />

      {/* Project List */}
      <main className="max-w-6xl p-4 md:p-0 items-center mx-auto mt-10 mb-20 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-10">
        {filteredProducts?.map((project) => (
          <Link
            key={project._id}
            href={`/project/${project.name.split(" ").join("")}`}
          >
            <ProjectCard key={project._id} project={project} />
          </Link>
        ))}
      </main>
      
      <Footer />
    </div>
  );
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the projects in our database */
  const result = await Tool.find({ active: true });
  const projects = result.map((doc) => {
    const project = doc.toObject()
    project._id = project._id.toString()
    return project
  })

  return { props: { projects: projects } }
}
