import React from "react";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";

export default function ActiveButton({ project }) {
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      active: !project.active,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
  });

  const handleClick = () => {
    updateProject();
  };

  return (
    <div
      className="bg-green-700 p-1 rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-white">Active</p>
    </div>
  );
}
