"use client";

import { ModalProps } from "@/state/api";
import { useState } from "react";
import { Task } from "@/state/api";
import Modal from "./Modal";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ImagePicker } from "./ImagePicker";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";



export const TasKCreation: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Task>({
        title: "",
        description: "",
        deadline: new Date(),
        taskImage: []

    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === "deadline" ? new Date(value) : value }))
    }
    const handleImageSelect = (files: File[]) => {
        setFormData((prev) => ({
            ...prev,
            taskImage: files,
        }));
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token")
        if (!token) {
            console.log("Authentication token is missing")
            return
        }

        if (!formData.title || !formData.description || !formData.deadline || formData.taskImage.length === 0) {
            toast.error("Title, description, deadline, and at least one image are required.");
            setLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("deadline", formData.deadline.toISOString());
        formData.taskImage.forEach((image: File) => {
            formDataToSend.append(`taskImage`, image)
        })

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.status == 201) {
                setFormData({
                    title: "",
                    description: "",
                    deadline: new Date(),
                    taskImage: []
                });
                console.log(response.data);
                onClose()
                toast.success("Task created successfully.")
            }
            console.log(response.data);
        } catch (error) {
            console.error("Error while creating task", error);
            toast.error("Failed to create a Task. Please try again.")

        }

    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} name="Create Tasks" width='max-w-md'>
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700" htmlFor="images">
                        Images
                    </Label>
                    <ImagePicker onImageSelected={handleImageSelect} multiple={true} maxFiles={3} maxSizeInMB={10} />
                </div>
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
                    <Label className="text-sm font-medium text-gray-700" htmlFor="Skills">Deadline</Label>
                    <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        placeholder='Enter a skills of the Job'
                        value={formData.deadline ? formData.deadline.toISOString().split("T")[0] : ""}
                        onChange={handleInputChange}
                        className='w-[400px] h-[50px] text-black'
                    />
                </div>
                <div className='flex flex-row-reverse'>
                    <Button type="submit" className="w-full h-[50px]" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Task'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}