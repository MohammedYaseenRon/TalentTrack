import React, { useState } from "react";
import { ApplicationsForm } from "@/state/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ModalProps } from "@/state/api";
import Modal from "./Modal";
import { Apple, University } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { JobOfferProps } from "@/state/api";
import axios from "axios";
import toast from "react-hot-toast";
import { TagInput } from "./TagInput";

interface MainApplicationProps {
    isOpen: boolean;
    onClose: () => void;
    name: string;
    job: JobOfferProps | null;
}


export const MainApplication: React.FC<MainApplicationProps> = ({
    isOpen,
    onClose,
    name,
    job
}) => {
    if (!isOpen) return null;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<ApplicationsForm>({
        resumeUrl: "",
        coverLetter: "",
        noticePeriod: "",
        expectedSalary: "",
        education: {
            degree: "",
            university: "",
            graduationYear: ""
        },
        workExperience: {
            companies: [{
                name: "",
                position: "",
                duration: ""
            }]
        },
        skills: [],
        additionalInfo: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleWorkExperienceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            workExperience: {
                companies: prev.workExperience.companies.map((company, i) =>
                    i === index ? { ...company, [name]: value } : company
                )
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log("Submitting application");


        const { resumeUrl, coverLetter, noticePeriod, expectedSalary, education, workExperience, skills, additionalInfo } = formData;

        // Log the job and formData for debugging
        console.log("Job:", job);
        console.log("Form Data:", formData);

        if (
            !job ||
            !job.id ||
            !resumeUrl.trim() ||
            !coverLetter.trim() ||
            !noticePeriod.trim() ||
            !expectedSalary.trim() ||
            !education.degree.trim() ||
            !education.university.trim() ||
            !education.graduationYear ||
            workExperience.companies.some(company => !company.name.trim() || !company.position.trim() || !company.duration.trim()) ||
            skills.length === 0 ||
            !additionalInfo.trim()
        ) {
            console.error("Validation failed:", { job, formData });
            toast.error("All fields are required for submitting the application.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/application", {
                jobId: job.id,
                userId: 1,
                resumeUrl,
                coverLetter,
                noticePeriod,
                expectedSalary,
                education,
                workExperience,
                skills,
                additionalInfo,
            });

            console.log(response.data);
            if (response.status === 201) {
                toast.success("Application created successfully.");
                onClose();
                setFormData({
                    resumeUrl: "",
                    coverLetter: "",
                    noticePeriod: "",
                    expectedSalary: "",
                    education: {
                        degree: "",
                        university: "",
                        graduationYear: "",
                    },
                    workExperience: {
                        companies: [{
                            name: "",
                            position: "",
                            duration: "",
                        }],
                    },
                    skills: [],
                    additionalInfo: "",
                });
            }
        } catch (error) {
            console.error("Error while creating application:", error);
            toast.error("Failed to create application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleAddSkill = (skill: string) => {
        if (!formData.skills.includes(skill)) {
            setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
        }
    }

    const handleRemoveSkill = (skill: string) => {
        setFormData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
    }

    return (

        <Modal isOpen={isOpen} onClose={onClose} name={name}>
            <Card className="space-y-4 w-full w-max-2xl mx-auto">
                {/* <CardHeader>
                            <CardTitle>Job application</CardTitle>
                            <CardDescription>Apply for: {jobTitle}</CardDescription>
                        </CardHeader> */}
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6 p-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700" htmlFor="resume">Resume Url</Label>
                            <Input
                                id="resumeUrl"
                                name="resumeUrl"
                                placeholder='Resume url'
                                value={formData.resumeUrl}
                                onChange={handleInputChange}
                                className='w-full h-[50px] text-black'
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700" htmlFor="projectDescription">Cover Letter</Label>
                            <Textarea
                                id="coverLetter"
                                name="coverLetter"
                                placeholder='Why we should consider you'
                                value={formData.coverLetter}
                                onChange={handleInputChange}
                                className='w-full h-[200px] text-black'
                                rows={4}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700" htmlFor="Tags">Expected Salary</Label>
                                <Input
                                    id="expectedSalary"
                                    name="expectedSalary"
                                    placeholder='Enter your expected salary'
                                    value={formData.expectedSalary}
                                    onChange={handleInputChange}
                                    className='w-full h-[50px] text-black'
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700" htmlFor="Tags">Notice Period</Label>

                                <Select value={formData.noticePeriod} onValueChange={(value) =>
                                    setFormData((prev) => ({ ...prev, noticePeriod: value }))
                                }>
                                    <SelectTrigger className="h-[50px]">
                                        <SelectValue placeholder="Select notice period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="immediate">Immediate</SelectItem>
                                        <SelectItem value="15 days">15 Days</SelectItem>
                                        <SelectItem value="30 days">30 Days</SelectItem>
                                        <SelectItem value="60 days">60 Days</SelectItem>
                                        <SelectItem value="90 days">90 Days</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700" htmlFor="degree">Degree</Label>
                                <Input
                                    id="degree"
                                    placeholder='Degree'
                                    value={formData.education.degree}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev, education: { ...prev.education, degree: e.target.value }
                                    }))}
                                    className='w-full h-[50px] text-black'
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700" htmlFor="livedemo">University</Label>
                                <Input
                                    id="university"
                                    placeholder='University'
                                    value={formData.education.university}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev, education: { ...prev.education, university: e.target.value }
                                    }))}
                                    className='w-full h-[50px] text-black'
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700" htmlFor="graduationYear">Graduation Year</Label>
                                <Input
                                    id="graduationYear"
                                    placeholder='Enter your Graduation salary'
                                    value={formData.education.graduationYear}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev, education: { ...prev.education, graduationYear: e.target.value }
                                    }))}
                                    className='w-full h-[50px] text-black'
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Work Experience</Label>
                            {formData.workExperience.companies.map((company, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4 mt-2">
                                    <Input
                                        name="name"
                                        value={company.name}
                                        onChange={(e) => handleWorkExperienceChange(e, index)}
                                        placeholder="Company Name"
                                        required
                                    />
                                    <Input
                                        name="position"
                                        value={company.position}
                                        onChange={(e) => handleWorkExperienceChange(e, index)}
                                        placeholder="Position"
                                        required
                                    />
                                    <Input
                                        name="duration"
                                        value={company.duration}
                                        onChange={(e) => handleWorkExperienceChange(e, index)}
                                        placeholder="Duration"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700" htmlFor="sourcecode">Skills</Label>
                            <TagInput
                                tags={formData.skills}
                                onAddTag={handleAddSkill}
                                onRemoveTag={handleRemoveSkill}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700" htmlFor="projectDescription">Additional Info</Label>
                            <Textarea
                                id="additionalInfo"
                                name="additionalInfo"
                                placeholder='Enter any additional Information'
                                value={formData.additionalInfo}
                                onChange={handleInputChange}
                                className='w-full h-[200px] text-black'
                                rows={4}
                            />
                        </div>

                        <div className='flex flex-row-reverse'>
                            <Button type="submit" className="w-full h-[50px]">
                                Submit Application
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Modal>
    )
}