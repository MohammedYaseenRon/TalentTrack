import React from "react";
import FeatureCard from "./featureCard";
import { Star, Upload, Search } from 'lucide-react'


export default function Features() {
    return (
        <div className="bg-[#FFFFFF] h-auto flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 md:px-16 lg:px-32 py-12">
            <div className="max-w-lg flex flex-col text-center lg:text-start mt-12">
                <h1 className="text-4xl lg:text-6xl font-bold text-[#1E1E1E] leading-snug">What <span className="text-purple-600 ">Features</span> we Provide ?</h1>
                <p className="text-xl text-[#1E1E1E] font-bold">
                    Skip the resume pile—let your projects speak for you.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 sm:p-12">
            <FeatureCard
                    icon={<Upload className="h-10 w-10 text-primary" />}
                    title="Upload Projects"
                    description="Job seekers can easily upload and showcase their best work."
                />
                <FeatureCard
                    icon={<Search className="h-10 w-10 text-primary" />}
                    title="Discover Talents"
                    description="Recruiters can browse and search for skilled candidates."
                />
                <FeatureCard
                    icon={<Star className="h-10 w-10 text-primary" />}
                    title="Rate and Review"
                    description="Recruiters provide valuable feedback on projects."
                />
            </div>
        </div>
    )
}