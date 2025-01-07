import React, { useState } from 'react'
import Modal from './Modal';
import { ModalProps } from '@/state/api';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { TagInput } from './TagInput';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from './ui/button';
import { JobOfferProps } from '@/state/api';


const JobOffer: React.FC<ModalProps> = ({ isOpen, onClose, name, width}) => {
    const [formData, setFormData] = useState<JobOfferProps>({
        title: "",
        description: "",    
        skills: [],
        salary:"",
        location: "",
        deadline: ""
    })
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(null)
        setLoading(true)

        const { title, description, skills,salary,location, deadline } = formData;

        if (!title || !description || !skills || !salary || !location || !deadline) {
            toast.error("All fields must be filled");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            console.log("Token:", localStorage.getItem("token"));  // Log token before making the request

            // console.log("Token retrieved from localStorage:", token);

            if (!token) {
                console.log("Authentication token is missing");
                return;
            }
            const response = await axios.post("http://localhost:4000/jobs", {
                title,
                description,
                skills,
                salary,
                location,
                deadline
              },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
            console.log(response.data)
            if (response.status == 201) {
                setFormData({
                    title:"",
                    description:"",
                    skills:[],
                    salary:"",
                    location:"",
                    deadline:""
                })
                onClose();
                toast.success("Job created successfully");
            }
        } catch (error) {
            console.log("Error while creating jobs", error);
            toast.error("Error while creating Jobs")
        }
        //api call 
    }

    const handleAddSkill = (skill: string) => {
        if (!formData.skills.includes(skill)) {
            setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
        }
    }

    const handleRemoveSkill = (skill: string) => {
        setFormData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} name="Jobs" width='max-w-md'>
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700" htmlFor="Title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder='Enter a title of the Job'
                        value={formData.title}
                        onChange={handleInputChange}
                        className='w-[400px] h-[50px] text-black'
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700" htmlFor="Description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder='Enter a Description  of the Job'
                        value={formData.description}
                        onChange={handleInputChange}
                        className='w-[400px] h-[50px] text-black'
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700" htmlFor="Skills">Skills</Label>
                    {/* <Input
                        id="skills"
                        name="skills"
                        placeholder='Enter a skills of the Job'
                        value={formData.skills}
                        onChange={handleInputChange}
                        className='w-[400px] h-[50px] text-black'
                    /> */}
                    <TagInput
                        tags={formData.skills}
                        onAddTag={handleAddSkill}
                        onRemoveTag={handleRemoveSkill}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700" htmlFor="Location">Salary:</Label>
                    <Input
                        id="salary"
                        name="salary"
                        placeholder='Enter a Salary of the Job'
                        value={formData.salary}
                        onChange={handleInputChange}
                        className='w-[400px] h-[50px] text-black'
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700" htmlFor="Location">Location:</Label>
                    <Input
                        id="location"
                        name="location"
                        placeholder='Enter a Location of the Job'
                        value={formData.location}
                        onChange={handleInputChange}
                        className='w-[400px] h-[50px] text-black'
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700" htmlFor="Deadline">Deadline</Label>
                    <Input
                        id="deadline"
                        name="deadline"
                        type='date'
                        placeholder='Select a deadline of the Job'
                        value={formData.deadline}
                        onChange={handleInputChange}
                        className='w-[400px] h-[50px] text-black'
                    />
                </div>
                <div className='flex flex-row-reverse'>
                    <Button type="submit" className="w-full h-[50px]">
                        Create Job
                    </Button>
                </div>
            </form>

        </Modal>
    )
}

export default JobOffer