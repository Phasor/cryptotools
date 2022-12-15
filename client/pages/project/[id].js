import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECT } from "../../queries/projectQueries";
import { UPDATE_PROJECT } from "../../mutations/projectMutations";
import { CameraIcon } from "@heroicons/react/24/solid";

export default function project() {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [website, setWebsite] = useState("");
  const [active, setActive] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [errors, setErrors] = useState("");
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });
  const imgInputRef = useRef(null);

  useEffect(() => {
    setName(data?.project.name);
    setSymbol(data?.project.symbol);
    setWebsite(data?.project.website);
    setActive(data?.project.active);
  }, [data]);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: id,
      name,
      symbol,
      image,
      website,
      active,
    },
    onCompleted: () => {
      console.log("Project Updated");
    },
    refetchQueries: [{ query: GET_PROJECT }],
    context: {
      headers: {
        Authorization:
          typeof window !== "undefined" ? localStorage.getItem("token") : "",
      },
    },
  });

  const UploadImage = async (image) => {
    // console.log("uploading image");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "rgydp4v2");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CLOUDINARY_ENDPOINT}/duzlvcryq/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
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
    let imgURL = "";
    if (image) {
      imgURL = await UploadImage(image);
    }

    // send mutation to update project
    updateProject();
  };

  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="h-screen w-screen bg-gray-100 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="border shadow mt-10 p-6 w-[40%]"
          >
            <h1 className="font-medium p-1 text-lg mb-3">
              Edit {data.project.name}
            </h1>
            <div className="flex flex-col items-center space-y-6">
              <label className="text-left">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-md outline-none p-2 w-full"
              />
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="rounded-md outline-none p-2 w-full"
              />
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="rounded-md outline-none p-2 w-full"
              />

              {/* Picture Upload */}
              <div onClick={() => imgInputRef.current.click()}>
                <CameraIcon className="h-7 text-red-500" />
                <p className="text-xs sm:text-sm xl:text-base">Picture</p>
                <input
                  ref={imgInputRef}
                  className="hidden"
                  id="inputTag"
                  type="file"
                  onChange={(e) => {
                    addImageToPost(e);
                    setImage(e.target.files[0]);
                  }}
                />
              </div>
            </div>

            {imgPreview && (
              <div
                onClick={removeImage}
                className="flex flex-col text-center filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
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
            {/* checkbox for active or not */}
            <div className="flex items-center space-x-2 mt-5">
              <p>Active</p>
              <input
                type="checkbox"
                value={active}
                onChange={(e) => setActive(e.target.value)}
                className="rounded-md outline-none p-2 w-full"
                defaultChecked={data.project.active}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
}
