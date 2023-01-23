import React, { useState } from "react";
import {useEffect} from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@apollo/client";
import { DELETE_LINK } from "../mutations/linkMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from 'next/router';

export default function DeleteLinkButton({ link }) {
  const [displayError, setDisplayError] = useState(null);

  const [deleteLink, { error }] = useMutation(DELETE_LINK, {
    variables: { id: link.id },
    onCompleted: () => {
      // console.log("link deleted");
      toast.success("Link deleted");
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
    <div>
      <TrashIcon
        title="Delete link"
        className="h-4 w-4 md:h-5 md:w-5 transform hover:scale-110 text-white"
        onClick={deleteLink}
      />
      {displayError && <p>{displayError.message}</p>}
    </div>
  );
}
