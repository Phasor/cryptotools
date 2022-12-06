import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="absolute top-0 -z-50 w-screen flex justify-center items-center bg-gradient-to-t from-white to-blue-200">
      <div className="w-[50%] py-[250px] px-20 flex flex-col item ml-10">
        <h1 className="text-7xl py-2 font-bold">Crypto Dashboards</h1>
        <h3 className="text-2xl py-2">Do Your Own Research.</h3>
        <p className="text-gray-500">
          Links to great crypto data dashboards so you can stop relying on
          influncers and DYOR.
        </p>
      </div>
      <div className="w-[50%] relative flex justify-center">
        <Image src="/data2.png" width={500} height={500} />
      </div>
    </div>
  );
}
