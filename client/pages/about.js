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
        <title>Crypto Dashboards | About</title>
        <meta
          name="description"
          content="Free crypto dashboards to help you find what crypto will boom this year. Cryptocurrency research made easy."
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
            I&apos;ve been into crypto for a while. I got tired of getting my
            information from &quot;crypto influencers&quot; on twitter. I got
            burned. I want to do my own research using dashboards that the
            comminut has put together. From time to time I would find a cool new
            dashboard about a project I liked. The problem was that they were
            totally disparate and all over the internet.
          </p>
          <p className="mt-2">
            This is a simple repository of 3rd party links to dashboards about
            crypto projects that I have found useful.
          </p>
          <p className="mt-2">
            Please feel free to{" "}
            <Link href="/suggest" className="text-blue-500 underline">
              suggest a new link
            </Link>{" "}
            if you found it useful.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
