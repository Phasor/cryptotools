import React, { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';
import Modal from "./Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProjectButton() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ active: false });
  const [image, setImage] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [errors, setErrors] = useState(null);
  const client = useQueryClient();

  const addProject = async(data) => {
    // console.log(`Form data: ${JSON.stringify(data)}`)
    if(localStorage.getItem("token")){
      try{
        const token = localStorage.getItem("token");
        const response = await fetch('/api/add-project', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        });
        const dataResponse = await response.json();
        return dataResponse;
      } catch(err){
        console.log(err);
      }
    } else {
      console.log("No token found");
    }
  }

  const addProjectMutation = useMutation(addProject, {
    onSuccess: (response) => {
      // refetch the projects query after a successful mutation
      if (response.success) {
        client.invalidateQueries(["allProjects"]);
        toast.success("Project added!");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error adding project");
    }
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
      imgURL = await UploadImage(image)
      console.log(`imgURL: ${imgURL}`);
    }
    addProjectMutation.mutate({
      name: formData.name,
      image: imgURL,
      website: formData.website,
      shortDescription: formData.shortDescription,
      longDescription: formData.longDescription,
      active: formData.active,
      category: formData.category,
      rating: formData.rating,
    });
    setShowModal(false); 
  };

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 shadow-md md:mt-[150px]"
      >
        Add Project
      </button>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="flex flex-col">
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
              <label>Short Desc.</label>
              <input
                type="text"
                placeholder="A great on chain analytics tool!"
                className="p-1 my-2 outline-none border rounded-md"
                name="shortDescription"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <label>Long Desc.</label>
              <textarea
                rows="5"
                
                placeholder="Enter long description"
                className="w-full p-1 my-2 outline-none border rounded-md"
                name="longDescription"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <label>Project Website</label>
              <input
                type="text"
                placeholder="www.glassnode.com"
                className="p-1 my-2 outline-none border rounded-md"
                name="website"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <label>Rating</label>
              <select
                name="rating"
                onChange={handleChange}
                className="p-1 my-2 outline-none border rounded-md"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <label>Category</label>
              <select
                name="category"
                onChange={handleChange}
                className="p-1 my-2 outline-none border rounded-md"
              >
                <option value="tax">Tax</option>
                <option value="research">Research</option>
                <option value="onchain-data">On-chain Data</option>
                <option value="wallet">Wallet</option>
                <option value="exchange">Exchange</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 justify-between my-3">

              {/* upload image */}
              <label>Project Image</label>
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

            <div className="flex items-center space-x-2 my-3">
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
              <div className="bg-red-500 text-white p-2 rounded-md">
                #{errors}
              </div>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}
