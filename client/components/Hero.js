import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="lg:min-h-[500px] max-h-[600px] w-screen lg:flex justify-center items-center bg-gradient-to-t from-[#F9F8F8] to-blue-200">
      <Link href="/">
        <div className="p-5 lg:min-w-[50%] lg:mt-[200px] flex flex-col lg:ml-20">
          <h1 className="mt-10 md:mt-2 text-5xl md:text-7xl py-2 font-bold whitespace-nowrap ">
            Crypto<span className="text-blue-500">Toolkit</span>
          </h1>
          <h3 className="text-2xl py-2">The best crypto tools</h3>
          <p className="text-gray-500">
            Get an edge in your research, and do your taxes...
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
          className="object-cover w-[300px] h-[300px]"
        />
      </div>
    </div>
  );
}
