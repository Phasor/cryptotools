import React from "react";
import NavBar from "../components/NavBar";

export default function login() {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="flex justify-center items-center">
        <form className="border p-5 rounded-lg flex flex-col space-y-2 md:top-[300px] shadow-lg md:absolute">
          <p className="mb-2">Login</p>
          <div className="space-y-3 flex flex-col">
            <input
              type="text"
              className="py-2 px-3 outline-none rounded-md border-gray-300"
              placeholder="Username"
              name="username"
            />
            <input
              type="password"
              className="py-2 px-3 outline-none rounded-md border-gray-300"
              placeholder="Password"
              name="password"
            />
            <button
              type="submit"
              className="py-2 px-3 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
