import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

export default function about() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
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
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="max-w-[400px] border rounded-md p-3 shadow-lg mt-5"
            >
              <div className="my-2">
                <label className="p-1" htmlFor="from">
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
                  <p className="text-red-500 text-sm">{error.from}</p>
                )}
              </div>
              <div className="my-2">
                <label className="p-1" htmlFor="Project">
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
                  <p className="text-red-500 text-sm">{error.project}</p>
                )}
              </div>
              <div className="my-2">
                <label className="p-1" htmlFor="Link">
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
                  <p className="text-red-500 text-sm">{error.link}</p>
                )}
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
