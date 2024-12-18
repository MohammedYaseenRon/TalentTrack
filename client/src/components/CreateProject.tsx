"use client";


import React,{useState,useEffect} from 'react';
import Modal from './Modal';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { File } from 'lucide-react';
import { Button } from './ui/button';
import { ImagePicker } from './ImagePicker';
import axios from 'axios';


interface ProjectProps {
    projectName:string;
    projectDescription:string;
    techStack:string;
    tags:string;
    livedemo:string;    
    sourcecode:string;    
    images:File[] 

}
interface ModalProps {
    id? :string | null;
    isOpen: boolean;
    onClose: () => void;
    name:string;

}


const CreateProject = ({isOpen,onClose,name}:ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
    const [formData,setFormData] = useState<ProjectProps>({
    projectName:"",
    projectDescription:"",
    techStack:"",
    livedemo:"",
    tags:"",    
    sourcecode:"",    
    images:[]

   })

   const handleImageSelect = (files: File[]) => {
    setFormData(prev => ({
        ...prev,
        images: files.length > 0 ? files : [],
    }));
};


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
    const {name,value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
}


useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Token on page load:", token); // Check token on component mount
  if (!token) {
    console.log("Authentication token is missing");
  }
}, []); // Empty dependency array means this runs once when the component mounts

const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted"); // Add this line to check

    const payload = {
      ...formData,
      techStack: formData.techStack.split(',').map((tech) => tech.trim()), // Convert techStack to array
      tags: formData.tags.split(',').map((tag) => ({ name: tag })), // Convert tags to array of objects
    };

    const {projectName,projectDescription,techStack,sourcecode,livedemo,images,tags} = formData;
    
    
    if(!projectName || !projectDescription || !techStack || !sourcecode || !formData.images || !livedemo || !tags){
      console.log("All field must be filled first");
      return;
    }

    try{
      const token = localStorage.getItem("token");
      console.log("Token retrieved from localStorage:", token);
  

      if (!token) {
        console.log("Authentication token is missing");
        return;
      }
      const response = await axios.post("http://localhost:4000/project",{
        name:projectName,
        description: projectDescription,
        techStack,
        sourcecode,
        tags,
        livedemo,
        images:[]
      },
      {
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  
        }
      });
      if(response.status == 200){
        console.log("Project Created successfully:", response.data);
        alert("Project created successfullly");
      }
    } catch(error){
      console.error("Error while creating projects:", error);
      alert("Failed to create a projects. Please try again.");
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
                maxSizeInMB={5}
                />
            </div>
            <div className='flex flex-row-reverse'>
                <Button type="submit" className="w-full h-[50px]">
                {loading ? "Creating..." : "Create Project"}
                </Button>
            </div>
            
        </form>
        {errors && <div className="error">{errors}</div>}
    </Modal>
  )
}

export default CreateProject