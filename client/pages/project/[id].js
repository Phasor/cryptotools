import React from 'react'
import NavBar from '../../components/NavBar'
import Hero from '../../components/Hero'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getProjectById } from '../../queries/projectQueries'
import Rating from 'react-rating';
import Image from 'next/image'
import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function Project() {
  const router = useRouter()
  const { id } = router.query;

  // fetch the data
  const { status, data, error } = getProjectById(id);

  if (status === "loading" || data === undefined) {
    return <div className="text-center">Loading...</div>;
  }

  if (status === "error") {
    return <div className="text-center">Error: {error.message}</div>;
  }

  if (status ==="success") {
    return (
      <div className='w-full min-h-screen bg-[#F9F8F8] overflow-y-auto'>
        <Script src="https://kit.fontawesome.com/b24cab7e32.js" crossorigin="anonymous"></Script>
        <Head>
          <title>{data.name}</title>
          <meta
            name="description"
            content={`An overview of ${data.name} crypto project.`}
          />
          <meta
            name="keywords"
            content="crypto dashboard, dashboard crypto, crypto data analytics, cryptocurrency research, blockchain, bitcoin, ethereum"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <Hero />
        <div className='max-w-6xl mx-auto flex flex-col items-center justify-center sm:flex-row sm:space-x-8 p-4'>
          <Image
            src={data.data.image}
            alt={data.data.name}
            width={300}
            height={300}
            className='object-cover my-2 w-[150px] md:w-[300px]'
          />
          <div className='flex flex-col'>
            <h1 className='font-bold text-3xl'>{data.data.name}</h1>
            <p className='my-2'><span className='text-small px-2 bg-blue-500 text-white rounded-full'>{data.data.category}</span></p>
            <p className='my-2'><span className='font-semibold'>TLDR: </span>{data.data.shortDescription}</p>
            <h2 className='font-semibold mt-4'>Full Description</h2>
            <p className='my-2'>{data.data.longDescription}</p>
            <Rating 
                className='text-yellow-500'
                initialRating={parseInt(data.data.rating)}
                readonly
                fullSymbol="fa fa-star"
                emptySymbol="fa fa-star-o"
                fractions={2}
                />
          </div>
        </div>
      </div>
    )
  }
}
