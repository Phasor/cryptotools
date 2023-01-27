import React from 'react'
import Image from 'next/image'
import Rating from 'react-rating';

export default function ProjectCard({ project }) {

  let projectCategory = project.category;
  let capitalizedProjectCategory = projectCategory[0].toUpperCase() + projectCategory.slice(1);

  return (
    <div className='flex flex-col items-center justify-center sm:max-w-[300px] shadow-lg rounded-lg bg-white hover:bg-blue-100 cursor-pointer transform hover:scale-105'>
        <div className='flex justify-center p-4'>
            <Image
                src={project.image}
                alt={project.name}
                width={200}
                height={200}
                className='object-cover w-[150px] md:w-[175px] lg:w-[200px] '
            />
         
         {/* sm:w-64 md:w-96 lg:w-128 sm:h-64 md:h-96 lg:h-128 */}
        </div>
        <div className='flex flex-col items-start w-full p-4'>
            <h1 className='text-xl font-bold'>{project.name}</h1>
            <p className='text-xs my-1'><span className='bg-blue-500 text-white px-1 rounded-full'>{capitalizedProjectCategory}</span></p>
            <p className='my-2'>{project.shortDescription}</p>
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
