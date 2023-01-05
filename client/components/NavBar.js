import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav className="absolute top-0 transparent flex justify-end w-screen p-2">
      <ul className="flex p-2 space-x-5 font-medium mr-5">
        {router.pathname == "/" ? (
          <>
            <li className="text-lg border border-gray-700 cursor-pointer py-2 px-3 rounded-sm hover:bg-gray-800 hover:bg-opacity-5">
              About
            </li>
            <li className="text-lg border border-gray-700 cursor-pointer py-2 px-3 rounded-sm hover:bg-gray-800 hover:bg-opacity-5">
              Suggest a Link
            </li>
          </>
        ) : (
          <>
            <Link href="/">
              <li className="text-lg border border-gray-700 cursor-pointer py-2 px-3 rounded-sm hover:bg-gray-800 hover:bg-opacity-5">
                Home
              </li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
