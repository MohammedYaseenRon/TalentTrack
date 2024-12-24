import React from 'react'
import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react';

export interface ProjectCardProps {
    id: number,
    projectName: string;
    projectDescription: string;
    techStack: string[];
    livedemo: string;
    sourcecode: string;
    tags: string[];
    images: string[];
}

export default function ProjectsCard({
    projectName,
    projectDescription,
    techStack,
    livedemo,
    sourcecode,
    tags,
    images = []

}: ProjectCardProps) {
    return (
        <div className="bg-white cursor-pointer w-[400px] h-[auto] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="relative w-full h-36">
                <Image
                    src={images.length > 0 ? images[0] : "/images/project1.png"}
                    alt="Project Image"
                    layout="fill"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <h1 className="text-lg font-medium px-4 text-white text-center">{projectName}</h1>
                </div>
            </div>
            <div className="p-4">
                <p className="text-sm font-bold text-black">{projectDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags && tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                    {tags && tags.length > 3 && (
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                            +{tags.length - 3}
                        </span>
                    )}

                </div>
                <div className="flex space-x-2">
                    <a
                        href={livedemo}
                        className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ExternalLink className="w-5 h-5" />
                    </a>
                    <a
                        href={sourcecode}
                        className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github className="w-5 h-5" />
                    </a>

                </div>
            </div>
        </div>
    )
}

