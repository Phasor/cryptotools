import React, { useEffect } from "react";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import Router from 'next/router';

export default function ActiveButton({ project }) {
  const [updateProject, { error }] = useMutation(UPDATE_PROJECT, {
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
    onError(error) {
      console.log(error);
    }  
  });

  useEffect(() => {
    if (error) {
      Router.push('/error?message=' + error.message);
    }
  }, [error]);

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
