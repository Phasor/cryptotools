import React from 'react'
import NavBar from '../../components/NavBar'
import Hero from '../../components/Hero'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getProjectByName } from '../../queries/projectQueries'
import Rating from 'react-rating';
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../components/Spinner'

export default function Project() {
  const router = useRouter();
  const { name } = router.query;
  
  const projectyQuery = useQuery({
    queryKey: ["project", name],
    queryFn: () => getProjectByName(name),
    enabled: name !== undefined,
  })

  return (
    <div className='w-full min-h-screen bg-[#F9F8F8] overflow-y-auto relative'>
      <Script src="https://kit.fontawesome.com/b24cab7e32.js" crossorigin="anonymous"></Script>
      <Head>
        <title>{projectyQuery.data?.data[0]?.name}</title>
        <meta
          name="description"
          content={`An overview of ${projectyQuery.data?.data[0]?.name} crypto project.`}
        />
        <meta
          name="keywords"
          content="crypto dashboard, dashboard crypto, crypto data analytics, cryptocurrency research, blockchain, bitcoin, ethereum"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Hero />
      <div className='max-w-6xl mx-auto flex flex-col items-center justify-center sm:flex-row sm:space-x-8 p-2 sm:p-4 overflow-y-auto mb-20'>
        { projectyQuery.status === "success" && (
          <>
            <Image
              src={projectyQuery.data?.data[0]?.image}
              alt={projectyQuery.data?.data[0]?.name}
              width={300}
              height={300}
              className='object-cover my-4 md:my-2 w-[150px] md:w-[300px] rounded-full'
            />
            <div className='w-full flex flex-col border rounded-lg shadow-lg p-4 sm:min-w-[50%]'>
              <h1 className='font-bold text-3xl'>{projectyQuery.data?.data[0].name}</h1>
              <p className='my-2'><span className='text-small px-2 bg-blue-500 text-white rounded-full'>{projectyQuery.data?.data[0].category}</span></p>
              <p className='my-2'><span className='font-semibold'>TLDR: </span>{projectyQuery.data?.data[0].shortDescription}</p>
              <h2 className='font-semibold mt-4'>Full Description</h2>
              <p className='my-2'>{projectyQuery.data?.data[0].longDescription}</p>
              <h2 className='font-semibold mt-4'>Review</h2>
              <p className='mt-2 mb-6 italic'>"{projectyQuery.data?.data[0].review}"</p>
              <span className='font-semibold'>Our Rating: 
                <Rating 
                  className='text-yellow-500 ml-2'
                  initialRating={parseInt(projectyQuery.data?.data[0].rating)}
                  readonly
                  fullSymbol="fa fa-star"
                  emptySymbol="fa fa-star-o"
                  fractions={2}
                />
                </span>
                <div className='flex space-x-2 items-center my-4'>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 w-4"/>
                  <a href={projectyQuery.data?.data[0].website} target="_blank" className='text-blue-500 underline hover:text-blue-700'>Visit {projectyQuery.data.data[0].name}</a>
                </div>
                  <Link href="/" className='mt-4 text-blue-500 underline hover:text-blue-700'>Back</Link>
            </div>    
          </>
        )}
        
         {/* loading spinner */}
        { projectyQuery.status === "loading" && ( 
            //   <div className="text-center mt-10 flex justify-center mx-auto">
            //   <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            // </div>
            <Spinner/>
        )}

        {/* error message */}
        { projectyQuery.status === "error" && (
          <div className="text-center mt-10">
            <h1 className="text-2xl font-bold">Error: {projectyQuery.error?.message}</h1>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

