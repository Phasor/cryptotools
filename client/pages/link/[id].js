import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_LINK } from "../../queries/linkQueries";
import { UPDATE_LINK } from "../../mutations/linkMutations";
import NavBar from "../../components/NavBar";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLink() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_LINK, { variables: { id } });
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [active, setActive] = useState(false);

  const [updateLink] = useMutation(UPDATE_LINK, {
    variables: {
      id: id,
      name,
      url,
      active,
    },
    onCompleted: () => {
      // console.log("Link Updated");
      toast.success("Link Updated");
    },
    refetchQueries: [{ query: GET_LINK }],
    context: {
      headers: {
        Authorization:
          typeof window !== "undefined" ? localStorage.getItem("token") : "",
      },
    },
  });

  useEffect(() => {
    setName(data?.link.name);
    setUrl(data?.link.url);
    setActive(data?.link.active);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLink();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center bg-gray-100">
      <NavBar />
      {!loading && !error && (
        <form
          onSubmit={handleSubmit}
          className="border shadow p-6 rounded-md w-full max-w-[400px] h-fit md:mt-[150px]"
        >
          <div className="flex flex-col">
            <h1 className="font-medium p-1 text-lg mb-3">
              Edit Link
            </h1>
            <label htmlFor="name"></label>
            <input
              type="text"
              name="name"
              id=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded shdow p-2 border my-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="url"></label>
            <input
              type="text"
              name="url"
              id=""
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="rounded shdow p-2 border my-2"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="active">Active</label>
            <input
              type="checkbox"
              name="active"
              value={active}
              onChange={(e) => setActive(e.target.checked)}
              className="rounded-md outline-none p-2 h-[15px] w-[15px] ml-2"
              defaultChecked={data.link.active}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md my-2 w-full"
          >
            Update Link
          </button>
          <Link href="/admin" className="text-blue-500 font-medium">
            Back
          </Link>
        </form>
      )}
    </div>
  );
}
