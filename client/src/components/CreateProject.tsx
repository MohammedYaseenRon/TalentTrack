"use client";


import React,{useState} from 'react';
import Modal from './Modal';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { File } from 'lucide-react';
import { Button } from './ui/button';
import { ImagePicker } from './ImagePicker';


interface ProjectProps {
    projectName:string;
    projectDescription:string;
    techStack:string;
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
    const [formData,setFormData] = useState<ProjectProps>({
    projectName:"",
    projectDescription:"",
    techStack:"",
    livedemo:"",    
    sourcecode:"",    
    images:[]

   })

const handleImageSelect = (files: File[]) => {
    setFormData(prev => ({
        ...prev,
        images: files
    }));
};


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
    const {name,value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
}

const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    console.log("Projects Created succes fully",formData);
    //Api logic here for creating projects
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
                    Create Project
                </Button>
            </div>
            
        </form>
    </Modal>
  )
}

export default CreateProject