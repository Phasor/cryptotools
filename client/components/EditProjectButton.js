import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function EditProjectButton({ project }) {
  return (
    <Link href={`/project/${project.id}`}>
      <PencilIcon className="h-5 w-5 transform hover:scale-110 text-blue-500" />
    </Link>
  );
}
