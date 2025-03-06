"use client";

import { JobOfferProps } from '@/state/api'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Banknote, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MainApplication } from '@/components/MainApplication';



const JobPage = () => {
    const [selectedJobs, setSelectedJobs] = useState<JobOfferProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<JobOfferProps | null>(null);


    const handleOpenModal = (job: JobOfferProps) => {
        // console.log('Opening modal for job:', job);
        // console.log('Current modal state before:', isModalOpen);
        setSelectedJob(job);
        setIsModalOpen(true);
        // console.log('Current modal state after:', true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);

    }


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:4000/jobs");
                setSelectedJobs(response.data);
                setLoading(false)
            } catch (error) {
                console.log("Error no projects found");
                setLoading(false);
            }
        }
        fetchJobs();
    }, [])


    if (loading) return <div>Loading...</div>;

    return (
        <>
            <ScrollArea className="flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
                <div className="max-w-7xl mx-auto p-4">
                    <div className="space-y-4">
                        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
                            {selectedJobs.map((job, index) => (
                                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 relative overflow-hidden group">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{job.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div>
                                            <p className="text-base font-medium text-gray-600 line-clamp-3">{job.description}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {job.skills.map((skill, skillIndex) => (
                                                <Badge key={skillIndex} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-200">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded-full">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="font-medium">{job.location}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Banknote className="h-4 w-4 text-green-500" />
                                                <span className="font-medium">{job.salary}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="h-4 w-4 text-orange-500" />
                                                <span className="font-medium">Deadline: {job.deadline}</span>
                                            </div>
                                        </div>
                                        <Button onClick={() => handleOpenModal(job)}
                                            className="w-full bg-blue-600 text-white"
                                        >
                                            <h2 className="text-lg">Apply</h2>
                                        </Button>
                                    </CardContent>


                                </Card>
                            ))}


                        </div>

                    </div>

                </div>
            </ScrollArea>
            <MainApplication
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                name="Job Application"
                job={selectedJob}
            />
        </>
    )
}

export default JobPage