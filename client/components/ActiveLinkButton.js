import React, { useEffect } from "react";
import { UPDATE_LINK } from "../mutations/linkMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import Router from 'next/router';

export default function ActiveLinkButton({ link }) {
  const [updateLink, { error }] = useMutation(UPDATE_LINK, {
    variables: {
      id: link.id,
      active: !link.active,
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
    updateLink();
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
