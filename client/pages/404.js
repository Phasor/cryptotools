import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Link from "next/link";
import Footer from "../components/Footer";
import Head from "next/head";

export default function About() {
  return (
    <div className="w-screen min-h-screen relative bg-[#F9F8F8]">
      <Head>
        <title>Page Not Found 404</title>
        <meta name="description" content="404 page not found." />
        <meta
          name="keywords"
          content="crypto, cryptocurrency, dashboards, projects, data, blockchain, bitcoin, ethereum"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Hero />
      <div className="flex justify-center w-screen">
        <div className="flex flex-col p-5 md:max-w-[80%] ">
          <h1 className="text-xl">404</h1>
          <p className="mt-2">
            Sorry, we can't find the page you're looking for.
          </p>
          <Link href="/" className="underline text-blue-500 mt-4">
            Go back
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}
