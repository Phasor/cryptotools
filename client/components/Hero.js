import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="lg:min-h-[500px] max-h-[600px] w-screen bg-gradient-to-t from-[#F9F8F8] to-blue-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="p-5 lg:min-w-[50%] lg:mt-[200px] flex flex-col">
            <h1 className="mt-10 md:mt-2 text-5xl md:text-7xl py-2 font-bold whitespace-nowrap ">
              Crypto<span className="text-blue-500">Toolkit</span>
            </h1>
            <h3 className="text-2xl py-2">The best crypto tools</h3>
          </div>
        </Link>

        <div className="hidden lg:max-w-[50%] lg:flex lg:mr-20 lg:mt-[176px]">
          <Image
            src="/ethcase.png"
            alt="picture of graphs"
            width={450}
            height={450}
            priority={true}
            className="object-cover w-[300px] h-[300px]"
          />
        </div>
      </div>
    </div>
  );
}
