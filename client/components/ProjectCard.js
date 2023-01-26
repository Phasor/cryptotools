import React from 'react'
import Image from 'next/image'
import Rating from 'react-rating';

export default function ProjectCard({ project }) {
  return (
    <div className='flex flex-col items-center justify-center max-w-[200px] shadow-lg rounded-lg bg-white hover:bg-blue-100 cursor-pointer'>
        <div className='flex justify-center p-4'>
            <Image
                src={project.image}
                alt={project.name}
                width={200}
                height={200}
                className='rounded-lg transform hover:scale-105 object-cover'
            />
        </div>
        <div className='flex flex-col items-start w-full p-4'>
            <h1 className='text-lg font-bold'>{project.name}</h1>
            <p className='text-sm'>{project.category}</p>
            <Rating 
              className='text-yellow-500'
              initialRating={parseInt(project.rating)}
              readonly
              fullSymbol="fa fa-star"
              emptySymbol="fa fa-star-o"
              fractions={2}
              />
        </div>
    </div>
  )
}
