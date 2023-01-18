import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LogOutButton from "./LogOutButton";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav className="absolute top-0 transparent flex justify-center md:justify-end w-screen p-2 overflow-x-hidden">
      <ul className="flex p-1 sm:p-2 sm:space-x-5 space-x-3 font-medium sm:mr-5">
        {router.pathname !== "/admin" ? (
          <>
            <Link href="/">
              <li className="text-lg border border-gray-700 cursor-pointer py-2 px-3 rounded-sm hover:bg-gray-800 hover:bg-opacity-5">
                Home
              </li>
            </Link>
            <Link href="/about">
              <li className="text-lg border border-gray-700 cursor-pointer py-2 px-3 rounded-sm hover:bg-gray-800 hover:bg-opacity-5">
                About
              </li>
            </Link>
            <Link href="/suggest">
              <li className="text-lg border border-gray-700 cursor-pointer py-2 px-3 rounded-sm hover:bg-gray-800 hover:bg-opacity-5 whitespace-nowrap">
                Add Link
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link href="/">
              <li className="text-lg  text-white border border-white cursor-pointer py-2 px-3 rounded-sm hover:bg-gray-800 hover:bg-opacity-5">
                Home
              </li>
            </Link>
            <LogOutButton />
          </>
        )}
      </ul>
    </nav>
  );
}
