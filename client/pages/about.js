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
        <title>CryptoToolHub | About</title>
        <meta
          name="description"
          content="Mega list of the most useful crypto tools to help you get an edge in the crypto markets."
        />
        <meta
          name="keywords"
          content="crypto, cryptocurrency, dashboards, projects, data, blockchain, bitcoin, ethereum"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Hero />
      <div className="flex justify-center w-screen">
        <div className="flex flex-col p-5 md:max-w-[60%] ">
          <h1 className="text-xl">About</h1>
          <p className="mt-2">
            This site is a list of the best crypto tools to help you get an edge
            in the crypto markets. We review crypto portfolio trackers,
            exchanges, nft platforms, research and data tools and more to help
            you find the best crypto tools.
          </p>
          <p className="mt-2">
            Please feel free to{" "}
            <Link href="/suggest" className="text-blue-500 underline">
              suggest a new crypto focused tool
            </Link>{" "}
            if you found it useful.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
