import React from 'react'
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';

export default function Error() {
    const router = useRouter();
    const { message } = router.query;

  return (

    <div className="w-screen min-h-screen relative bg-[#F9F8F8] flex flex-col">
      <NavBar />
      <Hero />
        <div className='flex justify-center'>
            <div className='flex flex-col'>
                <h1 className='text-2xl'>Something went wrong :(</h1>
                <p className='text-2xl text-red-600 font-bold mt-2'>Message: {message}</p>
            </div>
        </div>
    </div>
  )
}
