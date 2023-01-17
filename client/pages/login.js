import React, { useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_AUTH_URL}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": "http://localhost:3000"
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user._id));
        router.push("/admin");
      } else {
        setError(data.message);
        // console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="border p-5 rounded-lg flex flex-col space-y-2 md:top-[300px] shadow-lg md:absolute"
        >
          <p className="mb-2">Login</p>
          <div className="space-y-3 flex flex-col">
            <input
              type="text"
              className="py-2 px-3 outline-none rounded-md border-gray-300"
              placeholder="Username"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="py-2 px-3 outline-none rounded-md border-gray-300"
              placeholder="Password"
              name="password"
              is="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="py-2 px-3 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
            >
              Log In
            </button>
          </div>
          {error && <p className="text-red-500 italic font-medium">{error}</p>}
        </form>
      </div>
    </div>
  );
}
