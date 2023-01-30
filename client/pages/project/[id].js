import React from 'react'
import NavBar from '../../components/NavBar'
import Hero from '../../components/Hero'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getProjectById } from '../../queries/projectQueries'
import Rating from 'react-rating';
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export default function Project() {
  const router = useRouter()
  const { id } = router.query;

  const { status, data, error } = getProjectById(id);

  return (
      <div className='w-full min-h-screen bg-[#F9F8F8] overflow-y-auto relative'>
        <Script src="https://kit.fontawesome.com/b24cab7e32.js" crossorigin="anonymous"></Script>
        <Head>
          <title>{data?.name}</title>
          <meta
            name="description"
            content={`An overview of ${data?.name} crypto project.`}
          />
          <meta
            name="keywords"
            content="crypto dashboard, dashboard crypto, crypto data analytics, cryptocurrency research, blockchain, bitcoin, ethereum"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <Hero />
        <div className='max-w-6xl mx-auto flex flex-col items-center justify-center sm:flex-row sm:space-x-8 p-4 overflow-y-auto mb-20'>
          { status === "success" && (
            <>
              <Image
                src={data.data.image}
                alt={data.data.name}
                width={300}
                height={300}
                className='object-cover my-2 w-[150px] md:w-[300px]'
              />
              <div className='flex flex-col border rounded-lg shadow-lg p-4'>
                <h1 className='font-bold text-3xl'>{data.data.name}</h1>
                <p className='my-2'><span className='text-small px-2 bg-blue-500 text-white rounded-full'>{data.data.category}</span></p>
                <p className='my-2'><span className='font-semibold'>TLDR: </span>{data.data.shortDescription}</p>
                <h2 className='font-semibold mt-4'>Full Description</h2>
                <p className='my-2'>{data.data.longDescription}</p>
                <span className='font-semibold'>Our Rating: 
                  <Rating 
                    className='text-yellow-500 ml-2'
                    initialRating={parseInt(data.data.rating)}
                    readonly
                    fullSymbol="fa fa-star"
                    emptySymbol="fa fa-star-o"
                    fractions={2}
                  />
                  </span>
                  <div className='flex space-x-2 items-center mt-2'>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 w-4"/>
                    <a href={data.data.website} target="_blank" className='text-blue-500 underline hover:text-blue-700'>Visit {data.data.name}</a>
                  </div>
                    <Link href="/" className='mt-2 text-blue-500 underline hover:text-blue-700'>Back</Link>
              </div>    
            </>
          )}
          
           {/* loading spinner */}
          { status === "loading" && ( 
                <div className="text-center mt-10">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
              </div>
          )}

          {/* error message */}
          { status === "error" && (
            <div className="text-center mt-10">
              <h1 className="text-2xl font-bold">Error: {error.message}</h1>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }

