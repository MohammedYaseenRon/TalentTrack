import React from "react";
import FeatureCard from "./featureCard";
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Upload, Search, ThumbsUp, Users } from 'lucide-react'



export default function Working() {
    return (
        <div className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
                <h1 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl mb-12">How it Works</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 place-items-center">
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

        </div>
    )
}