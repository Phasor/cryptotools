import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import { sendContactForm } from "../utils/api";
import Footer from "../components/Footer";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import ReCaptcha from "react-google-recaptcha";
import DOMPurify from 'dompurify';


export default function Suggest() {
  const reRef = useRef();
  const [formState, setFormState] = useState({
    from: "",
    project: "",
    link: "",
    token: "",
  });

  // below effect ensures the formData is updated with the token before the sendContactForm function is called.
  // Solves the issue caused by async useState call for setFormData in handleSubmit
  useEffect(() => {
    if (formState.token !== "") {
      // console.log(`formState in useeffect: ${JSON.stringify(formState)}`)

     // sanitize the input fields on the client-side
      const sanitizedEmail = DOMPurify.sanitize(formState.from);
      const sanitizedText1 = DOMPurify.sanitize(formState.project);
      const sanitizedText2 = DOMPurify.sanitize(formState.link);

      //update the formState with the sanitized values
      setFormState((prev) => ({
        ...prev,
        from: sanitizedEmail,
        project: sanitizedText1,
        link: sanitizedText2,
      }));

      sendContactForm(formState);
      setFormState({
        from: "",
        project: "",
        link: "",
        token: "",
      });
    }
  }, [formState.token]);

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
    // get recaptcha token
    const token = await reRef.current.executeAsync();
    console.log(`token: ${token}`)

    // add token to formState
    setFormState((prev) => ({ ...prev, token }));

    // reset the recaptcha
    reRef.current.reset();
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
    <div className="w-screen min-h-screen relative bg-[#F9F8F8]">
      <Head>
        <title>Crypto Tools | Suggest a link</title>
        <meta
          name="description"
          content="If you have links to crypto tools that you find useful, please let us know and we will add them to the website where appropriate."
        />
        <meta
          name="keywords"
          content="crypto, cryptocurrency, dashboards, projects, data, blockchain, bitcoin, ethereum"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Hero />
      <div className="flex justify-center bg-[#F9F8F8] min-h-sreen w-screen">
        <div className="p-5 flex flex-col items-left md:max-w-[60%]">
          <h1 className="text-xl">New Crypto Tool Link</h1>
          <p className="py-2">
            Suggest a link to a crypto tool/website
            that you find useful and we will add it to the website where
            appropriate.
          </p>
          <div className="flex justify-center mt-5 mb-16 ">
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
                  Crypto Tool Name
                </label>
                <input
                  className="border rounded-md outline-none p-2 w-full my-1"
                  type="text"
                  name="project"
                  required
                  placeholder="Glassnode"
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
                  placeholder="www.glassnode.com"
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
            <ReCaptcha
              sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
              size="invisible"
              ref={reRef}
            />
          </div>
        </div>
      </div>
      {/* end of form */}
      <Footer />
    </div>
  );
}
