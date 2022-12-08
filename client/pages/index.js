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
      <div className="w-screen h-screen flex justify-center overflow-y-auto">
        <Projects />
      </div>
    </div>
  );
}
