import React from "react";
import Image from "next/image";
import Rating from "react-rating";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectButton from "./EditProjectButton";
import Link from "next/link";

export default function ProjectCard({ project, isAdmin }) {
  let projectCategory = project.category.category || "";
  // console.log(`project`, project);
  let capitalizedProjectCategory =
    projectCategory[0]?.toUpperCase() + projectCategory?.slice(1);

  return (
    <div className="relative">
      <div className="h-[375px] flex flex-col items-center justify-center sm:max-w-[300px] shadow-lg rounded-lg bg-white hover:bg-blue-100 cursor-pointer transform hover:scale-105">
        <div className="flex justify-center items-center h-[50%] w-full border border-b border-gray-100">
          <Link
            key={project._id}
            href={`/project/${project.name.split(" ").join("")}`}
          >
            <Image
              src={project.image}
              alt={project.name}
              width={150}
              height={150}
              className="object-cover rounded-full"
            />
          </Link>
        </div>
        <div className="flex flex-col items-start w-full h-[50%] p-3">
          <div>
            <h1 className="text-xl font-bold">{project.displayName}</h1>
            <p className="text-xs my-1 inline-block">
              <span>
                {capitalizedProjectCategory &&
                  capitalizedProjectCategory !== "undefined" && (
                    <p className="bg-blue-500 text-white px-1 rounded-full">
                      {capitalizedProjectCategory}
                    </p>
                  )}
              </span>
            </p>
          </div>
          <div className="h-full flex flex-col justify-between">
            <p className="my-2">{project.shortDescription}</p>
            <Rating
              className="text-yellow-500"
              initialRating={parseFloat(project.rating)}
              readonly
              fullSymbol="fa fa-star"
              emptySymbol="fa fa-star-o"
              fractions={2}
            />
          </div>
        </div>
        {isAdmin && (
          <div>
            <EditProjectButton project={project} />
            <DeleteProjectButton project={project} />
          </div>
        )}
      </div>
    </div>
  );
}
