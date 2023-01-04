import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@apollo/client";
import { ADD_LINK } from "../mutations/linkMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function AddLinkButton({ project }) {
  const [addLink] = useMutation(ADD_LINK, {
    variables: { id: project.id },
    onCompleted: () => {
      console.log("link added");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
  });

  return (
    <div>
      <PlusIcon
        className="h-4 w-4 transform hover:scale-110 text-black"
        onClick={addLink}
      />
    </div>
  );
}
