"use client";

import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center">
        {/* Logo Image - matches navbar height */}
        <div className="relative h-20 sm:h-24 md:h-28 mr-2" style={{ width: 'auto' }}>
          <Image
            src="/logo/logo1.png"
            alt="TheCloudaro Logo"
            width={280}
            height={112}
            className="h-full w-auto object-contain pr-4"
            priority
          />
        </div>

      
        
      </Link>
    </div>
  );
};

export default Logo;
