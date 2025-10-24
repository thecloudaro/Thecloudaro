"use client";

import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center -ml-14 sm:-ml-16">
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-sm mr-2 flex items-center justify-center">
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 transform rotate-45"></div>
      </div>
      <Link href="/" className="text-white text-xl sm:text-2xl font-light font-nunito">
        TheCloudaro
      </Link>
    </div>
  );
};

export default Logo;
