import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import Modal from "./Modal";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AddProjectButton() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ active: false });
  const [image, setImage] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [errors, setErrors] = useState(null);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: formData.name,
      symbol: formData.symbol,
      image: formData.image,
      website: formData.website,
      active: formData.active,
    },
    onCompleted: () => {
      // console.log("Project added");
      toast.success("Project added");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const UploadImage = async (image) => {
    // console.log("uploading image");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "rgydp4v2");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT}/duzlvcryq/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      // console.log(data);
      return data.secure_url;
    } catch (err) {
      // console.log(err);
      setErrors(err);
    }
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImgPreview(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImgPreview(null);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    let imgURL = "";
    if (image) {
      imgURL = await UploadImage(image);
      // console.log(`imgURL: ${imgURL}`);
    }
    // send data to back end
    addProject({
      variables: {
        name: formData.name,
        symbol: formData.symbol,
        image: imgURL,
        website: formData.website,
        active: formData.active,
      },
    });
    setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 shadow-md md:mt-[150px] mb-10"
      >
        Add Project
      </button>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="flex flex-col opacity-100">
          <h1 className="text-2xl font-bold">Add Project</h1>
          <form onSubmit={(e) => handleModalSubmit(e)} className="p-2">
            <div className="flex items-center space-x-2 justify-between">
              <label>Project Name</label>
              <input
                type="text"
                placeholder="Cool Project"
                className="p-1 my-2 outline-none border rounded-md ml-2"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <label>Symbol</label>
              <input
                type="text"
                placeholder="BTC"
                className="p-1 my-2 outline-none border rounded-md"
                name="symbol"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <label>Project Website</label>
              <input
                type="text"
                placeholder="www.solana.com"
                className="p-1 my-2 outline-none border rounded-md"
                name="website"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <label>Project Image</label>
              {/* upload image */}
              <input
                type="file"
                onChange={(e) => {
                  addImageToPost(e);
                  setImage(e.target.files[0]);
                }}
              />
            </div>

            {imgPreview && (
              <div
                onClick={removeImage}
                className="my-2 flex flex-col items-center text-center filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={imgPreview}
                  alt="post preview"
                  height={60}
                  width={60}
                  className="rounded-3xl overflow-hidden"
                />
                <p className="text-red-500 hover:text-red-700">Remove</p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <label htmlFor="active">Active?</label>
              <input
                name="active"
                type="checkbox"
                checked={formData.active}
                onChange={handleCheckbox}
              />
            </div>
            <button
              type="submit"
              className="my-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 shadow-md"
            >
              Add Project
            </button>
            {errors && (
              <div className="bg-red-500 text-white p-2 rounded-md">#
                {errors}
              </div>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}
