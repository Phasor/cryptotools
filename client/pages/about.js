import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

export default function about() {
  return (
    <div className="w-screen relative">
      <NavBar />
      <Hero />
      <div className="flex justify-center bg-[#F9F8F8] h-screen w-screen">
        <div className="flex flex-col md:max-w-[60%] ">
          <h1 className="text-3xl p-2">About</h1>
          <p className="p-2 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            ducimus ipsam id suscipit nulla voluptates dolore voluptatibus
            impedit perspiciatis, illo facilis ad dicta voluptatum sed magnam
            laborum eum! Nostrum, voluptates.
          </p>
        </div>
      </div>
    </div>
  );
}
