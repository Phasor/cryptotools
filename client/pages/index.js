import { useEffect, useState } from "react";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { getActiveProjects } from "../queries/projectQueries";
import Script from "next/script";
import SearchBox from "../components/SearchBox";
import Link from "next/link";
import EmailList from "../components/EmailList";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const { data, status, error } = useProjects();
  const projectQuery = useQuery({
    queryKey: "activeProjects",
    queryFn: getActiveProjects,
  });

  // Filter the products based on the search value
  useEffect(() => {
    setFilteredProducts(
      projectQuery.data?.data.filter(
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
  }, [searchValue, projectQuery.data]);

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
      {projectQuery.status === "success" && (
        <main className="max-w-6xl p-4 md:p-0 items-center mx-auto mt-10 mb-20 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-10">
          {filteredProducts?.map((project) => (
            <Link href={`/project/${project.name.split(" ").join("")}`}>
              <ProjectCard key={project._id} project={project} />
            </Link>
          ))}
        </main>
      )}

      {/* loading spinner */}
      {projectQuery.status === "loading" && <Spinner />}

      {/* error message */}
      {projectQuery.status === "error" && (
        <div className="text-center mt-10">
          <h1 className="text-2xl font-bold">
            Error: {projectQuery.error.message}
          </h1>
        </div>
      )}

      <Footer />
    </div>
  );
}
