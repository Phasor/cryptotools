import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getProjectById, editProject } from "../../../queries/projectQueries";
import { useRouter } from 'next/router';
import useAuth from '../../../utils/useAuth';
import Footer from '../../../components/Footer';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';

export default function EditProject() {
    const router = useRouter();
    const { id } = router.query;
    const client = useQueryClient();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errors, setErrors] = useState("");
    const [formData, setFormData] = useState({ active: false });

    // const { data, status, error } = getProjectById(id);
    const projectQuery = useQuery({
      queryKey: ["projectToEdit", id],
      queryFn: () => getProjectById(id),
      enabled: id !== undefined,
    });


    // console.log(`data: ${JSON.stringify(projectQuery.data?.data)}`);

    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [imgPreview, setImgPreview] = useState("");
    const imgInputRef = useRef(null);

    // is logged in check
    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const isLoggedIn = useAuth()
        .then(loggedIn => {
            setIsLoggedIn(loggedIn);
            if (loggedIn === false) {
            router.push("/login");
            }
        })
        // console.log(`isLoggedIn: ${isLoggedIn}`); 
        }, []);

        const handleModalSubmit = (e) => {
            e.preventDefault();
    }

    useEffect(() => {
        // set form data once query resolves
        setFormData({ ...formData, 
            name: projectQuery?.data?.data.name,
            shortDescription: projectQuery?.data?.data.shortDescription,
            longDescription: projectQuery?.data?.data.longDescription,
            category: projectQuery?.data?.data.category,
            active: projectQuery?.data?.data.active,
            image: projectQuery?.data?.data.image,
            website: projectQuery?.data?.data.website,
            review: projectQuery?.data?.data.review,
         });

    },[projectQuery.data])

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
          // console.log(err);
          setErrors(err);
        }
      };
    
      const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files) {
          reader.readAsDataURL(e.target.files);
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
          setFormData({ ...formData, image: newImgURL });
        }
    
        // send mutation to update project
          EditProjectMutation.mutate({formData, id});
      }
    
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
        }
      });

  return (
    <div className='w-screen min-h-screen bg-gray-200 overflow-y-auto flex flex-col justify-center items-center'>
        <div className='flex w-full md:max-w-4xl justify-start'>
            <Link href="/admin"><button className='my-4 bg-blue-500 hover:bg-blue-600 rounded-md text-white py-2 px-3'>Back</button></Link>
        </div>
    { projectQuery.status === "success" && (
       <form onSubmit={handleSubmit} className="p-4 m-1 bg-gray-100 w-full md:max-w-4xl shadow-md rounded-md">
            <div className="flex items-center space-x-2 justify-between">
              <label>Project Name</label>
              <input
                type="text"
                value={formData.name}
                className="p-1 my-2 outline-none border rounded-md ml-2 w-[80%]"
                name="name"
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
                value={formData.category}
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
                  setImage(e.target.files);
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
                required
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
    { projectQuery.status === "loading" || !isLoggedIn && (
    <div className="text-center mt-10 flex justify-center mx-auto">
        <div className="animate-spin rounded-full h-15 w-15 border-b-2 border-gray-900"></div>
    </div>
    )}

    {/* error message */}
    { projectQuery.status === "error" && (
    <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Error: {JSON.stringify(projectQuery.error)}</h1>
    </div>
    )}
    <Footer/>
</div>
  )
}
