import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function EditProjectButton({ project }) {
  return (
    <div className=' bg-blue-800 absolute bottom-0 right-0 h-10 w-10 rounded-md flex justify-center items-center'>
      <Link href={`/project/edit/${project._id}`}>
        <PencilIcon
          title="Edit Project"
          className="h-5 w-5 transform hover:scale-110 text-white"
        />
      </Link>
    </div>
  );
}
