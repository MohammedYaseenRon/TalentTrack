"use client";


import React,{useState} from 'react';
import Modal from './Modal';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { File } from 'lucide-react';
import { ImagePicker } from './ImagePicker';


interface ProjectProps {
    projectName:string;
    projectDescription:string;
    techStack:string;
    livedemo:string;    
    sourcecode:string;    
    tags:string[];
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
    tags:[],
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
    <Modal isOpen={isOpen} onClose={onClose} name="Create Project">
        <form onSubmit={handleSubmit} className="p-4">
            <div className='space-y-4'>
                <div className='w-[200px] h-[50px] space-y-4'>
                    <Label className="text-sm font-medium text-gray-700" htmlFor="taskName">Project Name</Label>
                    <Input 
                        id="ProjectName" 
                        placeholder='Enter a project name' 
                        value={formData.projectName} 
                        onChange={handleInputChange} 
                        className='w-full text-black' 
                    />
                </div>
                <div className='w-[400px] h-[50px] space-y-4'>
                    <Label className="text-sm font-medium text-gray-700" htmlFor="taskName">Project Description</Label>
                    <Textarea 
                        id="ProjectName" 
                        placeholder='Enter a project name' 
                        value={formData.projectDescription} 
                        onChange={handleInputChange} 
                        className='w-full text-black' 
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className='w-[200px] h-[50px] space-y-4'>
                        <Label className="text-sm font-medium text-gray-700" htmlFor="taskName">TechStack</Label>
                        <Input 
                            id="TechStack" 
                            placeholder='Tech stack' 
                            value={formData.techStack} 
                            onChange={handleInputChange} 
                            className='w-full text-black' 
                        />
                    </div>
                    <div className='w-[200px] h-[50px] space-y-4'>
                        <Label className="text-sm font-medium text-gray-700" htmlFor="taskName">Live Demo</Label>
                        <Input 
                            id="Livedemo" 
                            placeholder='Live Demo' 
                            value={formData.livedemo} 
                            onChange={handleInputChange} 
                            className='w-full text-black' 
                        />
                    </div>

                </div>
                <div className='w-[200px] h-[50px] space-y-4'>
                    <Label className="text-sm font-medium text-gray-700" htmlFor="taskName">Source Code</Label>
                    <Input 
                        id="SourceCode" 
                        placeholder='Source Code' 
                        value={formData.sourcecode} 
                        onChange={handleInputChange} 
                        className='w-full text-black' 
                    />
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-[200px] h-[50px] space-y-4'>
                        <Label className="text-sm font-medium text-gray-700" htmlFor="Tags">Tags</Label>
                        <Input 
                            id="Tags" 
                            placeholder="Tags" 
                            value={formData.tags} 
                            onChange={handleInputChange} 
                            className='w-full text-black' 
                        />
                    </div>
                    <div className='w-[100px] h-[50px] space-y-4'>
                        <Label className="text-sm font-medium text-gray-700" htmlFor="Tags">Tags</Label>
                        <File type="file" />
                        <ImagePicker 
                            onImageSelected={handleImageSelect}
                            multiple={true}
                            maxFiles={3}
                            maxSizeInMB={5}
                        />
                    </div>

                </div>


            </div>

        </form>

    </Modal>
  )
}

export default CreateProject