import React from "react";
import Image from "next/image";




export default function Information() {
    return (
        <div className="bg-[#FFFFFF] min-h-screen flex items-center justify-between px-32">
            {/* Left Side - Text */}
            <div className="max-w-lg">
                <h1 className="text-7xl text-[#1E1E1E] leading-12 font-bold">Recruiter are here for creating Jobs</h1>
                <p className="text-2xl text-gray-400 font-semibold mt-3">You can just come and submit your application to your liked Job</p>
            </div>
            <div className="w-1/2 flex justify-center">
                <Image
                    src="/images/project1.png"
                    width={600}
                    height={600}
                    alt="Recruiter Illustration"
                    className="w-full max-w-lg h-[400px] object-cover rounded-lg shadow-lg"
                />

            </div>
        </div>
    )
}
