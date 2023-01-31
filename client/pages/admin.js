import useAuth from "../utils/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { useAllProjects } from "../queries/projectQueries"; 
import Script from "next/script";
import SearchBox from "../components/SearchBox";
import Link from "next/link";

export default function Home() { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data, status, error } = useAllProjects();
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isLoggedIn = useAuth()
    .then(loggedIn => {
      setIsLoggedIn(loggedIn);
      if (loggedIn === false) {
        router.push("/login");
      }
    })
    console.log(`isLoggedIn: ${isLoggedIn}`); 
    }, []);

   // Filter the products based on the search value
   useEffect(() => {
    setFilteredProducts(
      data?.data.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.longDescription.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.category.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, data]);

  // if (!isLoggedIn || loading)
  //   return (
  //     <div className="flex justify-center items-center min-h-screen w-screen">
  //       <p>Loading...</p>
  //     </div>
  //   );



return (
    <div className="w-screen min-h-screen relative bg-[#232323] overflow-y-auto">
      <Script src="https://kit.fontawesome.com/b24cab7e32.js" crossorigin="anonymous"></Script>
      <Head>
        <title>Crypto Tools List</title>
        <meta
          name="description"
          content="Free crypto dashboards about each major coin so that you can do your own research and decide the best crypto to buy today."
        />
        <meta
          name="keywords"
          content="crypto dashboard, dashboard crypto, crypto data analytics, cryptocurrency research, blockchain, bitcoin, ethereum"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />   
      <SearchBox value={searchValue} setSearchValue={setSearchValue} isAdmin={true}/>

      {/* Project List */}
      { status === "success" && (
      <main className="max-w-6xl p-4 md:p-0 items-center mx-auto mt-10 mb-20 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-10">
        {filteredProducts?.map((project) => (
          <Link href={`/project/${project._id}`}><ProjectCard key={project._id} project={project} /></Link>
        ))}
      </main>
      )}

      {/* loading spinner */}
      { status === "loading" || !isLoggedIn && (
        <div className="text-center mt-10 flex justify-center mx-auto">
          <div className="animate-spin rounded-full h-15 w-15 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* error message */}
      { status === "error" && (
        <div className="text-center mt-10">
          <h1 className="text-2xl font-bold">Error: {error.message}</h1>
        </div>
      )}
        
      <Footer />
    </div>
    )
  
}

