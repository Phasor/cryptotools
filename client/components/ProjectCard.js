import React from 'react'
import Image from 'next/image'

export default function ProjectCard({ project }) {
  return (
    <div className='flex flex-col items-center justify-center max-w-[200px] shadow-lg rounded-lg'>
        <div className='flex justify-center p-2'>
            <Image
                src={project.image}
                alt={project.name}
                width={200}
                height={200}
                className='rounded-lg'
            />
        </div>
        <div className='flex flex-col items-start'>
            <h1 className='text-lg font-bold'>{project.name}</h1>
            <p className='text-sm'>{project.category}</p>
            <p className='text-sm'>{project.rating}</p>
        </div>
    </div>
  )
}
