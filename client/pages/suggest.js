import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import { sendContactForm } from "../utils/api";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function Suggest() {
  const [formState, setFormState] = useState({
    from: "",
    project: "",
    link: "",
  });

  const [error, setError] = useState({
    from: "",
    project: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendContactForm(formState);
    toast.success("Mail sent");
    setFormState({
      from: "",
      project: "",
      link: "",
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "from":
        if (!value.includes("@") && !value.includes(".")) {
          setError((prev) => ({
            ...prev,
            [e.target.name]: "Please enter a valid email",
          }));
        } else {
          setError((prev) => ({
            ...prev,
            [e.target.name]: "",
          }));
        }
        break;
      case "project":
        if (value.length < 3) {
          setError((prev) => ({
            ...prev,
            [e.target.name]: "Please enter a valid project name",
          }));
        } else {
          setError((prev) => ({
            ...prev,
            [e.target.name]: "",
          }));
        }
        break;
      case "link":
        if (!value.includes(".")) {
          setError((prev) => ({
            ...prev,
            [e.target.name]: "Please enter a valid link",
          }));
        } else {
          setError((prev) => ({
            ...prev,
            [e.target.name]: "",
          }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-screen min-h-screen relative">
      <Head>
        <title>Crypto Project Statistics | Suggest a link</title>
        <meta
          name="description"
          content="If you have links to crypto dashboards you find useul, please let us know and we will add them to the website where appropriate."
        />
        <meta
          name="keywords"
          content="crypto, cryptocurrency, dashboards, projects, data, blockchain, bitcoin, ethereum"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Hero />
      <div className="flex justify-center bg-[#F9F8F8] w-screen">
        <div className="p-5 flex flex-col items-left md:max-w-[60%]">
          <h1 className="text-xl">New Crypto Dashboard Link</h1>
          <p className="py-2">
            Suggest a link to a dashboard showing stats about a crypto project
            that you find useful and we will add it to the website where
            appropriate.
          </p>
          <div className="flex justify-center mt-5 mb-16">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="max-w-[400px] border rounded-md p-3 shadow-lg"
            >
              <div className="my-2">
                <label className="p-1 font-semibold" htmlFor="from">
                  From
                </label>
                <input
                  className="border rounded-md outline-none p-2 w-full my-1"
                  type="text"
                  name="from"
                  required
                  placeholder="james@gmail.com"
                  value={formState.from}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {error.from && (
                  <p className="text-red-500 text-sm p-1">{error.from}</p>
                )}
              </div>
              <div className="my-2">
                <label className="p-1 font-semibold" htmlFor="Project">
                  Crypto Project
                </label>
                <input
                  className="border rounded-md outline-none p-2 w-full my-1"
                  type="text"
                  name="project"
                  required
                  placeholder="Cosmos Hub"
                  value={formState.project}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {error.project && (
                  <p className="text-red-500 text-sm p-1">{error.project}</p>
                )}
              </div>
              <div className="my-2">
                <label className="p-1 font-semibold" htmlFor="Link">
                  Link
                </label>
                <input
                  className="border rounded-md outline-none p-2 w-full my-1"
                  type="text"
                  name="link"
                  required
                  placeholder="http://www.cosmosdashboard.com"
                  value={formState.link}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {error.link && (
                  <p className="text-red-500 text-sm p-1">{error.link}</p>
                )}
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 w-full rounded-md my-2"
                type="submit"
                disabled={
                  formState.from === "" ||
                  formState.project === "" ||
                  formState.link === ""
                }
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* end of form */}
      <Footer />
    </div>
  );
}
