"use client";
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Github, Globe, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { jwtDecode } from 'jwt-decode';



interface ProjectDetails {
  id: number;
  name: string; // Add the 'name' property
  description: string;
  techStack: string[]; // Ensure it's an array
  livedemo: string;
  sourcecode: string;
  images: { url: string; type: string }[];
  rating?: number
}


const ProjectDetails = () => {

  const { id } = useParams();  // Get the 'id' from the URL
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [submittedRatings, setSubmittedRatings] = useState<{ [key: number]: boolean }>({})

  interface CustomJwtPayload {
    userId?: string // `userId` is optional, so TypeScript won't throw an error if it's missing
    role: string
    exp?: number // Add the exp property as an optional number
  }

  // Handle star click for rating
  const handleStarClick = (projectId: number, starIndex: number): void => {
    if (!submittedRatings[projectId]) {
      setRatings((prev) => ({
        ...prev,
        [projectId]: starIndex + 1, // Star index starts at 0, rating at 1
      }));
    }
  };

  //get actual userId
  const getUserId = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage",error);
        return null;
      }

      const decoded: CustomJwtPayload = jwtDecode(token);
      console.log("✅ Decoded Token:", decoded);

      if (!decoded.userId) {
        console.error("No userId found in decoded token",error);
        return null;
      }
      const currentTime = Date.now() / 1000 // Current time in seconds
      if (decoded.exp && currentTime > decoded.exp) {
        console.error("Token is expired",error)
        return null
      }

      return decoded.userId

    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };


  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/rating/${id}`);
        console.log(response.data);

        const ratingsMap = response.data.reduce((acc: {[key: number]:number }, item: { projectId: number; rating: number }) => {
          acc[item.projectId] = item.rating;
          return acc;
        }, {} as { [key: number]: number });

        setRatings(ratingsMap);
      } catch (error) {
        setError("Error fetching rating");
        console.error("Error fetching ratings:", error);
      }
    };
    fetchRatings();
  }, [id]);

  const handleRatingSubmit = async (projectId: number) => {
    const rating = ratings[projectId] || 0;
    if (!rating) return;

    const userId = getUserId()
    console.log(userId)
    if (!userId) {
      toast.error("Authentication token required")
      return
    }

    try {
      const response = await axios.post("http://localhost:4000/rating", {
        rating,
        projectId,
        userId: userId
      });
      console.log("Rating submitted:", response.data);
      setSubmittedRatings((prev) => ({ ...prev, [projectId]: true }))
      toast.success("You've successfully rated projects");
    } catch (error) {
      toast.error("Error while rating projects or you have rated this project once");
      console.log("Error while creating Rating", error);
    }
  }


  useEffect(() => {
    if (!id) return; // Ensure that 'id' is available before fetchin
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/project/${id}`);
        if (!response || !response.data) {
          throw new Error("Project not found");
        }
        setProject(response.data)
        setLoading(false);

      } catch (error) {
        console.log("Error while updating project details",error);
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
                {project.images?.length > 0 && (
                  <Image
                    src={project.images[0].url}
                    alt={project.name}
                    width={1000}
                    height={600}
                    priority
                  />
                )}
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
            <div className="flex p-6 ml-4">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`text-2xl cursor-pointer ${index <
                    (ratings[project.id] ?? project.rating ?? 0)
                    ? "text-[#F97316]" // Bright Orange
                    : "text-gray-300"
                    }`}
                  onClick={() => handleStarClick(project.id, index+1)}
                >
                  <Star size={16} />
                </span>
              ))}
            </div>
            <div className='p-6'>
              {!submittedRatings[project.id] && ratings[project.id] > 0 && (
                <Button
                  onClick={() => handleRatingSubmit(project.id)}
                  className="mt-2 text-sm bg-[#F97316] text-white hover:bg-[#EA580C]"
                >
                  Submit Rating
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>

  );
}


export default ProjectDetails;