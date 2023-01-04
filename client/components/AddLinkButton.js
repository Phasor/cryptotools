import React, { useState, useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@apollo/client";
import { ADD_LINK } from "../mutations/linkMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import Modal from "./Modal";

export default function AddLinkButton({ project }) {
  const [showModal, setShowModal] = useState(false);
  const linkNameRef = useRef("");
  const linkUrlRef = useRef("");
  const linkActiveRef = useRef(false);

  const [handleModalSubmit] = useMutation(ADD_LINK, {
    variables: {
      project: project.id,
      name: linkNameRef.current.value,
      url: linkUrlRef.current.value,
      active: linkActiveRef.current.checked,
    },
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
        onClick={() => setShowModal(true)}
      />
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Add Link</h1>
          <form onSubmit={handleModalSubmit} className="p-2">
            <div className="flex items-center space-x-2 justify-between">
              <label>Link Name: </label>
              <input
                type="text"
                placeholder="Cool dashboard 1"
                className="p-1 my-2 outline-none border rounded-md"
                ref={linkNameRef}
              />
            </div>
            <div className="flex items-center space-x-2">
              <label>URL: </label>
              <input
                type="text"
                placeholder="http://www.link.com"
                className="p-1 my-2 outline-none border rounded-md"
                ref={linkUrlRef}
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="active">Active?</label>
              <input
                id="active"
                name="active"
                type="checkbox"
                defaultChecked={true}
                ref={linkActiveRef}
              />
            </div>
            <button
              type="submit"
              onClick={handleModalSubmit}
              className="rounded-md bg-blue-500 text-white py-1 px-2 my-2 hover:bg-blue-600"
            >
              Add Link
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
