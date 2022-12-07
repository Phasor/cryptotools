import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <div className="w-screen relative">
      <NavBar />
      <Hero />
      <div className="w-screen flex justify-center">
        <Projects />
      </div>
    </div>
  );
}
