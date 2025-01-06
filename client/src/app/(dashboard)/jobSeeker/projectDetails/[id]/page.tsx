"use client";
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Github, Globe, Tags } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';



interface ProjectDetails {
  id: number;
  name: string; // Add the 'name' property
  description: string;
  techStack: string[]; // Ensure it's an array
  livedemo: string;
  sourcecode: string;
  images?: string[]; // Optional field for images
}


const projectDetails = () => {

  const { id } = useParams();  // Get the 'id' from the URL
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!id) return; // Ensure that 'id' is available before fetching
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/project/${id}`);
        if (!response || !response.data) {
          throw new Error("Project not found");
        }
        setProject(response.data)
        setLoading(false);

      } catch (error: any) {
        setError(error.message)
        console.log("Error while updating project details");
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [id])


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>No project found.</div>;
  return (
    <ScrollArea className="flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="divide-y divide-gray-200">
          {/* Project Name Section */}
          <div className="p-6 space-y-4">
            <span className="text-lg font-bold text-gray-600">Project Name:</span>
            <h1 className="text-2xl font-bold text-red-600">{project.name}</h1>
          </div>

          {/* Project Image Section */}
          <div className="p-6">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/project3.png"
                alt="Project Image"
                width={800}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="p-6">
            <div className="flex justify-center gap-4">
              <a
                href={project.sourcecode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github className="w-5 h-5" />
                Source Code
              </a>
              <a
                href={project.livedemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Globe className="w-5 h-5" />
                Live Demo
              </a>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="p-6">
            <Card className="border-none shadow-none">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Technology Used</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.techStack) ? (
                    project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800 hover:bg-gray-200 transition-colors"
                      >
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800 hover:bg-gray-200 transition-colors">
                      {project.techStack}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description Section */}
          <div className="p-6">
            <Card className="border-none shadow-none">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Project Description</h2>
                <p className="text-lg font-medium text-red-500 leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </ScrollArea>

  );
}


export default projectDetails;