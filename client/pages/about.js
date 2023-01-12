import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Link from "next/link";
import Footer from "../components/Footer"

export default function about() {
  return (
    <div className="w-screen min-h-screen relative bg-[#F9F8F8]">
      <NavBar />
      <Hero />
      <div className="flex justify-center w-screen">
        <div className="flex flex-col p-5 md:max-w-[60%] ">
          <h1 className="text-xl">About</h1>
          <p className="mt-2">
            I've been into crypto for a while. I got tired of getting my information from "crypto influencers" on twitter. I got burned. I want to do my own research
            using dashboards that the comminut has put together. From time to time I would find a cool new dashboard about a project I liked. The problem was that they 
            were totally disparate and all over the internet. 
          </p>
          <p className="mt-2">
            This is a simple repository of 3rd party links to dashboards about crypto projects that I have found useful.  
          </p>
          <p className="mt-2">
            Please feel free to <Link href="/suggest" className="text-blue-500 underline">suggest a new link</Link> if you found it useful. 
          </p>
        </div>
        <Footer/>
      </div>
    </div>
  );
}
