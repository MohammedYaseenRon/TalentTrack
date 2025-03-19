"use client";
import { TasKCreation } from "@/components/TaskCreation";
import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useTaskStore } from "@/state/jobStore";
import Modal from "@/components/Modal";
import { Submission } from "@/state/api";
import { ScrollArea } from "@/components/ui/scroll-area";



export default function Task() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { tasks, loading, fetchTasks } = useTaskStore();
    const [submissions, setSubmissions] = useState<Submission[] | null>(null);
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleOpenSubmission = async (taskId: number) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/submissions`);
            setSubmissions(response.data);
            setIsSubmissionModalOpen(true);
            console.log("Task Submissions:", response.data);
        } catch (error) {
            console.error("Error fetching task submissions:", error);
        }
    };
    const handleCloseSubmissionModal = () => {
        setIsSubmissionModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    useEffect(() => {
        fetchTasks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="p-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-purple-600">Manage Task Efficiently and view submission</h1>
                <div className="flex justify-end">
                    <Button onClick={handleOpenModal}>
                        <CheckSquare className='w-4 h-4 mr-2' />
                        Create Task
                    </Button>
                </div>
            </div>
            <div className="p-6">
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg mt-4">
                    <Table className="w-full">
                        <TableHeader className="bg-black">
                            <TableRow>
                                <TableHead className="w-[50px] text-white">
                                    <Checkbox />
                                </TableHead>
                                <TableHead className="text-white text-left">Task Id</TableHead>
                                <TableHead className="text-white">Task Name</TableHead>
                                <TableHead className="text-white">Actions</TableHead>
                                <TableHead className="text-right text-white">View Task Submission</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center p-4">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>{task.id}</TableCell>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>
                                            <Button size="sm">
                                                Edit
                                            </Button>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleOpenSubmission(task.id)}
                                            >
                                                View Submissions
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center p-4">
                                        No tasks available.
                                    </TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>

                    <TasKCreation
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        name="Create a Task"

                    />
                </div>
            </div>
            <Modal isOpen={isSubmissionModalOpen} onClose={handleCloseSubmissionModal} name="Submission" width='max-w-md'
                height="auto">
                <div className="p-4">
                    <ScrollArea className="h-[calc(80vh-100px)] px-6">
                        {submissions && submissions.length > 0 ? (
                            <div className="space-y-4">
                                {submissions.map((submission) => (
                                    <div
                                        key={submission.id}
                                        className="p-4 border border-gray-300 shadow-md rounded-lg bg-white hover:shadow-lg transition-shadow"
                                    >
                                        <h3 className="text-lg font-bold text-gray-700 mb-2">
                                            Task ID: <span className="font-medium text-gray-900">{submission.taskId}</span>
                                        </h3>
                                        <h2 className="text-lg font-bold text-gray-700 mb-2">
                                            Job-Seeker Name: <span className="font-medium text-gray-900">{submission.jobSeeker.name}</span>
                                        </h2>
                                        <p className="text-lg font-bold text-gray-700 mb-2">
                                            Email: <span className="font-medium text-gray-900">{submission.jobSeeker.email}</span>
                                        </p>
                                        <div className="border-t mt-3 pt-3">
                                            <a
                                                href={submission.submissonUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded transition"
                                            >
                                                📂 View Submission
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-600 py-4">
                                <p className="text-lg font-medium">🚫 No submissions available.</p>
                            </div>
                        )}
                    </ScrollArea>

                </div>
            </Modal>

        </div>
    )
}