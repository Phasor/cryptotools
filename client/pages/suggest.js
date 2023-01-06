import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

export default function about() {
  return (
    <div className="w-screen relative">
      <NavBar />
      <Hero />
      <div className="flex justify-center bg-[#F9F8F8] h-screen w-screen">
        <div className="flex flex-col items-left md:max-w-[60%]">
          <h1 className="text-2xl">New Crypto Dashboard Link</h1>
          <p className="py-2">
            Suggest a link to a dashboard showing stats about a crypto project
            that you find useful and we will add it to the website where
            appropriate.
          </p>
          <div className="flex justify-center">
            <form className="max-w-[400px] border rounded-md p-3 shadow-lg mt-5">
              <div className="my-2">
                <label className="p-1" htmlFor="from">
                  From
                </label>
                <input
                  className="border rounded-md outline-none p-2 w-full my-1"
                  type="text"
                  name="from"
                  required
                />
              </div>
              <div className="my-2">
                <label className="p-1" htmlFor="Project">
                  Crypto Project
                </label>
                <input
                  className="border rounded-md outline-none p-2 w-full my-1"
                  type="text"
                  name="Project"
                  required
                />
              </div>
              <div className="my-2">
                <label className="p-1" htmlFor="Link">
                  Link
                </label>
                <input
                  className="border rounded-md outline-none p-2 w-full my-1"
                  type="text"
                  name="Link"
                  required
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 w-full rounded-md my-2"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
