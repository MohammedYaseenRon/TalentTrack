"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, ImportIcon } from 'lucide-react'; // Assuming you're using react-feather for icons
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface ProjectCardProps {
  id: number;
  name: string; // Add the 'name' property
  description: string;
  techStack: string[]; // Ensure it's an array
  livedemo: string;
  sourcecode: string;
  images?: string[]; // Optional field for images
}



export default function Projects() {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:4000/project");
        console.log("http://localhost:4000/project");
        console.log("API Response:", response.data);
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error while fetching projects", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, [])


  return (
    <ScrollArea className="flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
      {/* Adjust height based on header */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-4">
          <Label className="text-black text-base font-medium text-start">Search</Label>
          <Input className="rounded-full w-[260px]" placeholder="search using tags and skills.." />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-white h-[400px] rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {/* Correct usage of Link with anchor tag */}
                <Link href={`/jobSeeker/projectDetails/${project.id}`}>
                  <div className="block h-full">
                    <div className="h-3/5 relative rounded-t-xl overflow-hidden">
                      <Image
                        src={project.images && project.images.length > 0 ? project.images[0] : "/images/project1.png"}
                        alt="Project Image"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h1 className="text-lg font-medium text-black">{project.name}</h1>
                        <p className="text-sm font-bold text-black">{project.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* <div className="flex flex-wrap gap-2 mb-4"> (Optional tags display logic) </div> */}

                <div className="flex space-x-4 mt-4">
                  <a
                    href={project.livedemo}
                    className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.sourcecode}
                    className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
        ))
          )}
      </div>
    </div>
    </ScrollArea >

  )
}

