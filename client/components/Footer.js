import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <div className="w-screen max-h-[100px] bg-yellow-500 flex justify-between shadow-inner bottom-0 absolute">
      <div className="flex space-x-2 p-2 whitespace-nowrap">
        <p>Made with</p>
        <HeartIcon className="h-6 w-6 transform hover:scale-110 text-red-600" />
        <p>by</p>
        <a
          href="https://twitter.com/phas0r"
          className="text-blue-500 underline"
        >
          @Phas0r
        </a>
      </div>
      <p className="p-2 md:mr-5 text-sm">Copyright 2023</p>
    </div>
  );
}
