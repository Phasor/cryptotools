import { useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import Router from 'next/router';

export default function DeleteProjectButton({ project }) {
  const [deleteProject, { error }] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    onCompleted: () => {
      // console.log("Project deleted");
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

  return (
    <div className="">
      <button className="" onClick={deleteProject}>
        <TrashIcon
          title="Delete Project"
          className="h-5 w-5 transform hover:scale-110 text-white"
        />
      </button>
    </div>
  );
}
