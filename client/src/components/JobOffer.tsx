import React, { useState } from 'react'
import Modal from './Modal';
import { ModalProps } from '@/state/api';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface JobOfferProps {
    title: string;
    description: string;
    skills: string;
    location: string,
    deadline: string;
}

const JobOffer: React.FC<ModalProps> = ({ isOpen, onClose, name, width }) => {
    const [formData, setFormData] = useState<JobOfferProps>({
        title: "",
        description: "",
        skills: "",
        location: "",
        deadline: ""
    })
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(null)
        setLoading(true)
        //api call 
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
                    <Input
                        id="skills"
                        name="skills"
                        placeholder='Enter a skills of the Job'
                        value={formData.skills}
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
                        placeholder='Select a deadline of the Job'
                        value={formData.deadline}
                        onChange={handleInputChange}
                        className='w-[400px] h-[50px] text-black'
                    />
                </div>
            </form>

        </Modal>
    )
}

export default JobOffer