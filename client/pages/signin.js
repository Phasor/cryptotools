import React from "react";
import LogInForm from "../components/LogInForm";
import NavBar from "../components/NavBar";

export default function signin() {
  return (
    <div className="h-screen w-screen relative bg-gray-100">
      <NavBar className="absolute top-0" />
      <div className="flex justify-center py-20 -z-10">
        <LogInForm />
      </div>
    </div>
  );
}
