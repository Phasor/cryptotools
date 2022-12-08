import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-[500px] max-h-[600px] w-screen flex justify-center items-center bg-gradient-to-t from-[#F9F8F8] to-blue-200">
      <div className="w-[50%] mt-[200px] px-20 flex flex-col item ml-20">
        <h1 className="text-7xl py-2 font-bold">Crypto Dashboards</h1>
        <h3 className="text-2xl py-2">Do Your Own Research.</h3>
        <p className="text-gray-500">
          Links to great crypto data dashboards so you can stop relying on
          influncers and DYOR.
        </p>
      </div>
      <div className="w-[50%] flex justify-center mr-20 mt-[200px]">
        <Image src="/data2.png" width={450} height={450} />
      </div>
    </div>
  );
}
