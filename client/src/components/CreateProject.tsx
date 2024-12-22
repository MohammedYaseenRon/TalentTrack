"use client";


import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { File } from 'lucide-react';
import { Button } from './ui/button';
import { ImagePicker } from './ImagePicker';
import axios from 'axios';
import toast from 'react-hot-toast';



interface ProjectProps {
  projectName: string;
  projectDescription: string;
  techStack: string;
  tags: string;
  livedemo: string;
  sourcecode: string;
  images: string[]

}
interface ModalProps {
  id?: string | null;
  isOpen: boolean;
  onClose: () => void;
  name: string;

}
interface ImageUploadResponse {
  url: string;
  type: string;
}



const CreateProject = ({ isOpen, onClose, name }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectProps>({
    projectName: "",
    projectDescription: "",
    techStack: "",
    livedemo: "",
    tags: "",
    sourcecode: "",
    images: []

  })

  const handleImageSelect = (files: File[]) => {
    const readerPromises = files.map(file =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file); // Convert to base64
      })
    );
  
    Promise.all(readerPromises).then(base64Images => {
      setFormData(prev => ({
        ...prev,
        images: base64Images,  
      }));
    }).catch(err => {
      console.error("Error reading images:", err);
      toast.error("Failed to process images. Please try again.");
    });
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    console.log("Form submitted"); // Add this line to check

    const payload = {
      ...formData,
      techStack: formData.techStack.split(',').map((tech) => tech.trim()), // Convert techStack to array
      tags: formData.tags.split(',').map((tag) => ({ name: tag })), // Convert tags to array of objects
      images: formData.images.map((img) => ({
        url: null,
        type: "image/png",
        data: img,
      })),
    };

    const { projectName, projectDescription, techStack, sourcecode, livedemo, images, tags } = payload;


    if (!projectName || !projectDescription || !techStack || !sourcecode || !images.length  || !livedemo || !tags) {
      toast.error("All fiels must be filled");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Token retrieved from localStorage:", token);

      if (!token) {
        console.log("Authentication token is missing");
        return;
      }
      console.log(images);
      const response = await axios.post('http://localhost:4000/project', {
        name: projectName,
        description: projectDescription,
        techStack,
        sourcecode,
        tags,
        livedemo,
        images,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      console.log(response.data);
      if (response.status == 201) {
        setFormData({
          projectName: "",
          projectDescription: "",
          techStack: "",
          livedemo: "",
          tags: "",
          sourcecode: "",
          images: [],
        });
        onClose(); 
        toast.success("Project created successfully.");
      }
    } catch (error) {
      console.error("Error while creating projects:", error);
      toast.error("Failed to create a projects. Please try again.");
    }

  }



  return (
    <Modal isOpen={isOpen} onClose={onClose} name={name}>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700" htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            name="projectName"
            placeholder='Enter a project name'
            value={formData.projectName}
            onChange={handleInputChange}
            className='w-[400px] h-[50px] text-black'
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700" htmlFor="projectDescription">Project Description</Label>
          <Textarea
            id="projectDescription"
            name="projectDescription"
            placeholder='Enter a project description'
            value={formData.projectDescription}
            onChange={handleInputChange}
            className='w-[500px] h-[50px] text-black'
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700" htmlFor="Tags">Tags</Label>
          <Input
            id="tags"
            name="tags"
            placeholder='Enter a projects Tags'
            value={formData.tags}
            onChange={handleInputChange}
            className='w-[400px] h-[50px] text-black'
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700" htmlFor="techStack">Tech Stack</Label>
            <Input
              id="techStack"
              name="techStack"
              placeholder='Tech stack'
              value={formData.techStack}
              onChange={handleInputChange}
              className='w-full h-[50px] text-black'
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700" htmlFor="livedemo">Live Demo</Label>
            <Input
              id="livedemo"
              name="livedemo"
              placeholder='Live Demo URL'
              value={formData.livedemo}
              onChange={handleInputChange}
              className='w-full h-[50px] text-black'
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700" htmlFor="sourcecode">Source Code</Label>
          <Input
            id="sourcecode"
            name="sourcecode"
            placeholder='Source Code URL'
            value={formData.sourcecode}
            onChange={handleInputChange}
            className="w-[400px] h-[50px] text-black"
          />
        </div>
        <div className='space-y-2'>
          <Label className="text-sm font-medium text-gray-700" htmlFor="images">Images</Label>
          <ImagePicker
            onImageSelected={handleImageSelect}
            multiple={true}
            maxFiles={3}
            maxSizeInMB={10}
          />
        </div>
        <div className='flex flex-row-reverse'>
          <Button type="submit" className="w-full h-[50px]">
             Create project
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateProject