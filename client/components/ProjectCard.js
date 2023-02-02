import React from 'react'
import Image from 'next/image'
import Rating from 'react-rating';
import Link from "next/link";
import DeleteProjectButton from './DeleteProjectButton';

export default function ProjectCard({ project, isAdmin }) {

  let projectCategory = project.category;
  let capitalizedProjectCategory = projectCategory[0].toUpperCase() + projectCategory.slice(1);

  function changeDescriptionLength(description){
    if(description.length > 60){
      return description.slice(0, 60) + '...'
    } else {
      // pad with spaces to make all cards the same height
      return description + ' '.repeat(60 - description.length)
    }
  }

  return (
    <div className='relative'>
      <Link href={`/project/${project._id}`}>
        <div className='flex flex-col items-center justify-center sm:max-w-[300px] shadow-lg rounded-lg bg-white hover:bg-blue-100 cursor-pointer transform hover:scale-105'>
            <div className='flex justify-center p-4'>
                <Image
                    src={project.image}
                    alt={project.name}
                    width={200}
                    height={200}
                    className='object-cover w-[150px] h-[150px] rounded-full '
                />
            </div>
            <div className='flex flex-col items-start w-full p-4 overflow-hidden'>
                <h1 className='text-xl font-bold'>{project.name}</h1>
                <p className='text-xs my-1'><span className='bg-blue-500 text-white px-1 rounded-full'>{capitalizedProjectCategory}</span></p>
                <p className='my-2' style={{ minHeight: "50px", textOverflow: "ellipsis" }}  >{project.shortDescription}</p>
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
      </Link>
      {
        isAdmin && (
          <DeleteProjectButton project={project}/>
        )
      }
      </div>
  )
}
