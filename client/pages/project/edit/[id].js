import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProjectById, editProject } from "../../../queries/projectQueries";
import { useRouter } from "next/router";
import useAuth from "../../../utils/useAuth";
import Footer from "../../../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Spinner from "../../../components/Spinner";
import Image from "next/image";
import mongoose from "mongoose";

export default function EditProject() {
  const router = useRouter();
  const { id } = router.query;
  const client = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imgPreview, setImgPreview] = useState("");
  const [categories, setCategories] = useState([]);

  const projectQuery = useQuery({
    queryKey: ["projectToEdit", id],
    queryFn: () => getProjectById(id),
    enabled: id !== undefined,
  });

  // console.log(`data: ${JSON.stringify(projectQuery.data?.data)}`);

  // is logged in check
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isLoggedIn = useAuth().then((loggedIn) => {
      setIsLoggedIn(loggedIn);
      if (loggedIn === false) {
        router.push(`${process.env.NEXT_PUBLIC_BASE_API_URL}/login`);
      }
    });
    // console.log(`isLoggedIn: ${isLoggedIn}`);
  }, [router]);

  useEffect(() => {
    // set form data once query resolves
    setFormData({
      ...formData,
      name: projectQuery?.data?.data.name,
      displayName: projectQuery?.data?.data.displayName,
      shortDescription: projectQuery?.data?.data.shortDescription,
      longDescription: projectQuery?.data?.data.longDescription,
      category: projectQuery?.data?.data.category,
      active: projectQuery?.data?.data.active,
      image: projectQuery?.data?.data.image,
      website: projectQuery?.data?.data.website,
      review: projectQuery?.data?.data.review,
      rating: projectQuery?.data?.data.rating,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectQuery.data]);

  useEffect(() => {
    // get list of categories
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
    const getCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/get-all-categories`);
        const data = await response.json();
        setCategories(data.data);
        // console.log(`Categories in edit > id: ${JSON.stringify(data.data)}`)
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const UploadImage = async (image) => {
    // console.log("trying to upload image");
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
      // console.log(data.secure_url);
      return data.secure_url;
    } catch (err) {
      console.log(err);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newImgURL = "";
    if (image) {
      // image has been changed, upload new one
      newImgURL = await UploadImage(image);
      const updatedFormData = {
        ...formData,
        image: newImgURL,
        category: mongoose.Types.ObjectId(formData.category),
      };
      EditProjectMutation.mutate({ formData: updatedFormData, id });
    } else {
      EditProjectMutation.mutate({ formData, id });
    }
  };

  const EditProjectMutation = useMutation({
    mutationFn: editProject,
    onSuccess: (response) => {
      // refetch the projects query after a successful mutation
      client.invalidateQueries(["allProjects"]);
      toast.success("Project updated successfully");
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.log(`error: ${error}`);
    },
  });

  return (
    <div className="w-screen min-h-screen bg-gray-200 overflow-y-auto flex flex-col justify-center items-center">
      <div className="flex w-full md:max-w-4xl justify-start">
        <Link href="/admin">
          <button className="my-4 bg-blue-500 hover:bg-blue-600 rounded-md text-white py-2 px-3">
            Back
          </button>
        </Link>
      </div>
      {projectQuery.status === "success" && (
        <form
          onSubmit={handleSubmit}
          className="p-4 m-1 bg-gray-100 w-full md:max-w-4xl shadow-md rounded-md"
        >
          <div className="flex items-center space-x-2 justify-between">
            <label>Project Name</label>
            <input
              type="text"
              value={formData.name}
              placeholder="Each new word should start with a captial letter e.g. &quot;Trail Of Bits&quot;"
              className="p-1 my-2 outline-none border rounded-md ml-2 w-[80%]"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2 justify-between">
            <label>Display Name</label>
            <input
              type="text"
              value={formData.displayName}
              className="p-1 my-2 outline-none border rounded-md ml-2 w-[80%]"
              name="displayName"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2 justify-between">
            <label>Short Desc.</label>
            <input
              type="text"
              value={formData.shortDescription}
              className="p-1 my-2 outline-none border rounded-md w-[80%]"
              name="shortDescription"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2 justify-between">
            <label>Long Desc.</label>
            <textarea
              rows="5"
              value={formData.longDescription}
              className="p-1 my-2 outline-none border rounded-md w-[80%]"
              name="longDescription"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2 justify-between">
            <label>Project Website</label>
            <input
              type="text"
              value={formData.website}
              className="p-1 my-2 outline-none border rounded-md w-[80%]"
              name="website"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2 justify-between">
            <label>Review</label>
            <textarea
              rows="5"
              value={formData.review}
              className="p-1 my-2 outline-none border rounded-md w-[80%]"
              name="review"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-2 justify-between">
            <label>Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="p-1 my-2 outline-none border rounded-md"
            >
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4</option>
              <option value="4.5">4.5</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 justify-between">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-1 my-2 outline-none border rounded-md"
              required
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category}
                </option>
              ))}
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
              <Image
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
            Edit Project
          </button>
          {errors && (
            <div className="bg-red-500 text-white p-2 rounded-md">
              #{errors}
            </div>
          )}
        </form>
      )}

      {/* loading spinner */}
      {projectQuery.status === "loading" || (!isLoggedIn && <Spinner />)}

      {/* error message */}
      {projectQuery.status === "error" && (
        <div className="text-center mt-10">
          <h1 className="text-2xl font-bold">
            Error: {JSON.stringify(projectQuery.error)}
          </h1>
        </div>
      )}
      <Footer />
    </div>
  );
}
