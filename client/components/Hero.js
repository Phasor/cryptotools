import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="lg:min-h-[500px] max-h-[600px] w-screen lg:flex justify-center items-center bg-gradient-to-t from-[#F9F8F8] to-blue-200">
      <Link href="/">
        <div className="p-5 lg:w-[50%] lg:mt-[200px] lg:px-20 flex flex-col lg:ml-20">
          <h1 className="mt-10 text-5xl md:text-7xl py-2 font-bold ">
            Crypto Dashboards
          </h1>
          <h3 className="text-2xl py-2">Do Your Own Research.</h3>
          <p className="text-gray-500">
            Links to great crypto data dashboards so you can stop relying on
            influncers and DYOR.
          </p>
        </div>
      </Link>
      <div className="hidden lg:w-[50%] lg:flex lg:justify-center lg:mr-20 lg:mt-[200px]">
        <Image
          src="/data2.png"
          alt="picture of graphs"
          width={450}
          height={450}
          priority={true}
        />
      </div>
    </div>
  );
}
