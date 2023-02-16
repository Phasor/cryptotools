import Head from "next/head";
import NavBar from "../../components/NavBar";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard";
import Script from "next/script";
import Link from "next/link";
import { useQuery } from "react-query";
import { getProjectsByCategory, getCategoryDescription } from "../../queries/projectQueries";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Project() {
    const router = useRouter();
    const { category } = router.query;

  const projectQuery = useQuery({
    queryKey: ["allProjectsInCategory", category],
    queryFn: () => getProjectsByCategory(category),
    enabled: category !== undefined
  });

  const categoryQuery = useQuery({
    queryKey: ["categoryDescription", category],
    queryFn: () => getCategoryDescription(category),
    enabled: category !== undefined
  });

  if (projectQuery.isLoading) return <div>Loading...</div>;
  if (projectQuery.isError) return <div>Error...</div>;

  return (
    <div className="w-screen min-h-screen relative bg-[#F9F8F8] overflow-y-auto">
      <Script
        src="https://kit.fontawesome.com/b24cab7e32.js"
        crossorigin="anonymous"
      ></Script>
      <Head>
        <title>CryptoToolKit</title>
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

      {/* Category Description */}
      {categoryQuery?.data?.data?.map((category) => (
      <div className="mx-auto max-w-6xl" key={category._id}>
        <p className="m-2">{category.description}</p>
      </div>
      ))}

      {/* Project List */}
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-blue-500 underline mx-2">Back</Link> 
        <main className="w-full m-2 md:p-0 items-center mt-10 mb-20 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-10">
          {projectQuery?.data?.data?.map((project) => (
            <Link
              key={project._id}
              href={`/project/${project.name.split(" ").join("")}`}
            >
              <ProjectCard key={project._id} project={project} />
            </Link>
          ))}
        </main>
      </div>

      <Footer />
    </div>
  );
}

