import React from 'react'
import NavBar from '../../components/NavBar'
import Hero from '../../components/Hero'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getProjectById } from '../queries/projectQueries';

export default function Project() {
  const router = useRouter();
  const { id } = router.query;

  // fetch the data
  const { status, data, error } = getProjectById(id);


  return (
    <div className='w-full min-h-screen bg-[#F9F8F8] overflow-y-auto'>
      <Head>
        <title></title>
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
      <Hero />

    </div>
  )
}
