import React from "react";

export default function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="max-w-xs sm:max-w-sm md:max-w-md bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out p-6 flex flex-col items-center text-center gap-3">
            <div className="flex flex-col items-center justify-center h-full text-center p-4 gap-2">
                {icon}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
                <p className="text-sm text-gray-600 font-bold dark:text-gray-400">{description}</p>
            </div>
        </div>

    )   
}