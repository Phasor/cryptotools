import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Modal from "./Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProjectButton() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ active: false });
  const [errors, setErrors] = useState(null);
  const client = useQueryClient();

  const addCategory = async (data) => {
    // console.log(`Form data: ${JSON.stringify(data)}`)
    if (localStorage.getItem("token")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/add-category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        });
        const dataResponse = await response.json();
        return dataResponse;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No token found");
    }
  };

  const addCategoryMutation = useMutation(addCategory, {
    onSuccess: (response) => {
      // refetch the projects query after a successful mutation
      if (response.success) {
        client.invalidateQueries(["allProjects"]);
        toast.success("Category added!");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error adding category");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    addCategoryMutation.mutate({
      category: formData.category,
        description: formData.description,
    });
    setShowModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 shadow-md md:mt-[150px]"
      >
        Add Category
      </button>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Add Category</h1>
          <form onSubmit={(e) => handleModalSubmit(e)} className="p-2">
            <div className="flex items-center space-x-2 justify-between">
              <label>Category Name</label>
              <input
                type="text"
                placeholder="Research"
                className="p-1 my-2 outline-none border rounded-md ml-2 w-[80%]"
                name="category"
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2 justify-between">
              <label>Desc.</label>
              <textarea
                rows="5"
                placeholder="Enter description"
                className="p-1 my-2 outline-none border rounded-md w-[80%]"
                name="description"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="my-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 shadow-md"
            >
              Add Category
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
