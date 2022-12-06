import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="w-100%">
      <NavBar />
      <Hero />
    </div>
  );
}
