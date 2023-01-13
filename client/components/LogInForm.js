import React from "react";

export default function LogInForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submit");
  };

  return (
    <div className="max-w-[300px] flex justify-center border border-black rounded-md shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col p-4 outline-none">
        <label htmlFor="username">Email</label>
        <input
          type="text"
          name="username"
          id="username"
          className="border border-gray-300 rounded-md my-2 outline-none py-1"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border border-gray-300 rounded-md my-2 outline-none py-1"
        />
      </form>
    </div>
  );
}
