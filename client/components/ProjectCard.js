import React from "react";
import Image from "next/image";
import Rating from "react-rating";
import Link from "next/link";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectButton from "./EditProjectButton";

export default function ProjectCard({ project, isAdmin }) {
  let projectCategory = project.category;
  let capitalizedProjectCategory =
    projectCategory[0].toUpperCase() + projectCategory.slice(1);

  return (
    <div className="relative max-h-[400px]">
      <div className=" flex flex-col items-center justify-center sm:max-w-[300px] shadow-lg rounded-lg bg-white hover:bg-blue-100 cursor-pointer transform hover:scale-105">
        <div className="flex justify-center p-4">
          <Image
            src={project.image}
            alt={project.name}
            width={200}
            height={200}
            className="object-cover w-[150px] h-[150px] rounded-full "
          />
        </div>
        <div className="flex flex-col items-start w-full p-4 overflow-hidden">
          <h1 className="text-xl font-bold">{project.name}</h1>
          <p className="text-xs my-1">
            <span className="bg-blue-500 text-white px-1 rounded-full">
              {capitalizedProjectCategory}
            </span>
          </p>
          <p
            className="my-2"
            style={{ minHeight: "50px", textOverflow: "ellipsis" }}
          >
            {project.shortDescription}
          </p>
          <Rating
            className="text-yellow-500"
            initialRating={parseInt(project.rating)}
            readonly
            fullSymbol="fa fa-star"
            emptySymbol="fa fa-star-o"
            fractions={2}
          />
        </div>
        {isAdmin && (
          <>
            <EditProjectButton project={project} />
            <DeleteProjectButton project={project} />
          </>
        )}
      </div>
    </div>
  );
}
