import React, { useState, useEffect, use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBox({ value, setSearchValue, isAdmin }) {
  return (
    <>
      <div className="mx-auto flex justify-center max-w-6xl"> 
        <div
          className={`w-full mx-4 mb-5 flex items-center p-3 rounded-full bg-zinc-100 hover:bg-zinc-200 
        border-2 border-b-gray-200 ${isAdmin ? "mt-10" : "mt-0"}`}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="h-4 w-4"
            style={{ color: "gray" }}
          />
          <input
            type="text"
            placeholder="Search For Crypto Tools"
            value={value}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full ml-2 items-center bg-transparent outline-none placeholder-gray-500"
          />
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex justify-center">
        <p className="underline text-blue-600 hover:text-blue-800">Visit <a href="http://www.cryptostatlist.com" target="_blank">CryptoStatList.com</a></p>
      </div>
    </>
  );
}
