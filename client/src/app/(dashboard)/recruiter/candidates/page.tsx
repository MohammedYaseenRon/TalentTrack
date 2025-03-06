"use client";

import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react'; // Assuming you're using react-feather for icons
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { ProjectImage } from '@/components/ProjectsCard';

interface ProjectCardProps {
  id: number;
  name: string; // Add the 'name' property
  description: string;
  techStack: string[]; // Ensure it's an array
  livedemo: string;
  sourcecode: string;
  images: { url: string; type: string }[];
  tags: { id: number; name: string }[];
  rating?: number
}




export default function CandidatesProjects() {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const projectRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  




  const getAllTechStacks = () => {
    const techStacks = new Set<string>();
    projects.forEach(project => {
      project.techStack.forEach(tech => techStacks.add(tech));
    });
    return Array.from(techStacks);
  }

  // const getAllTags = () => {
  //   const tags = new Set<string>();
  //   projects.forEach(project => {
  //     project.tags.forEach(tag => tags.add

  //     });
  //   })
  // }



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:4000/project");
        console.log("http://localhost:4000/project");
        console.log("API Response:", response.data);
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error while fetching projects");
        console.log("Error while fetching projects", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, [])

  useEffect(() => {
    let filtered = [...projects];

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTechStack.length > 0) {
      filtered = filtered.filter(project =>
        selectedTechStack.every(tech => project.techStack.includes(tech))
      );
    }

    setFilteredProjects(filtered);

    // Scroll to first result if exists
    if (filtered.length > 0) {
      const firstProjectRef = projectRefs.current[filtered[0].id];
      if (firstProjectRef) {
        firstProjectRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [searchQuery, selectedTechStack, projects]);

  const removeTechStack = (tech: string) => {
    setSelectedTechStack(prev => prev.filter(t => t !== tech));
  };

  


  return (
    <ScrollArea className="flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
      {/* Adjust height based on header */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className='flex-1 space-y-2'>
              <Label className="text-black text-base font-medium text-start">Search</Label>
              <Input className="rounded-full w-[260px]" placeholder="search using tags and skills.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select onValueChange={(value) => setSelectedTechStack(prev => [...prev, value])}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Tech Stack" />
                </SelectTrigger>
                <SelectContent>
                  {getAllTechStacks().map((tech) => (
                    <SelectItem key={tech} value={tech}>
                      {tech}
                    </SelectItem>
                  ))}
                </SelectContent>

              </Select>
            </div>
          </div>
          {(selectedTechStack.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {selectedTechStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="px-3 py-1">
                  {tech}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-2"
                    onClick={() => removeTechStack(tech)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className='col-span-full text-center'>Loading...</div>
            ) : error ? (
              <div className='col-span-full text-center text-red-500'>{error}</div>
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-full text-center">No projects found</div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  ref={(el) => { projectRefs.current[project.id] = el; }}
                  className="bg-white h-auto rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Correct usage of Link with anchor tag */}
                  <Link href={`/recruiter/candidates/projectDetails/${project.id}`}>
                    <div className="h-48 relative rounded-t-xl overflow-hidden">
                      <ProjectImage
                        imageUrl={project.images?.[0]?.url}
                        altText={project.name || "Project"}
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                      <h1 className="text-lg font-medium text-black">{project.name}</h1>
                      <p className="text-sm font-bold text-black">{project.description}</p>

                      <div className="flex items-center text-base gap-2 mt-2">
                        {project.techStack.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="px-2 py-0.5">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                  {/* <div className="flex flex-wrap gap-2 mb-4"> (Optional tags display logic) </div> */}
                  <div className="px-4 pb-4 flex justify-between space-x-4">
  
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
      </div>
    </ScrollArea >

  )
}

