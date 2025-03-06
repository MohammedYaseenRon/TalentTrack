"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useJobStore } from "@/state/jobStore";
const JobOffer = () => {
  const {
    jobs,
    applications,
    fetchingApplications,
    selectedJobId,
    loading,
    error,
    fetchJobs,
    deleteJob,
    fetchApplications,
    updateApplicationStatus,
    setSelectedJobId,
  } = useJobStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleEdit = (jobId: number) => {
    console.log("Edit", jobId);
  };


  const handleOpenModal = (jobId: number) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
    fetchApplications(jobId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobId(null);
  };

  const handleStatusChange = (newStatus: string, applicationId: number | undefined) => {
    if (applicationId !== undefined) {
      updateApplicationStatus(applicationId, newStatus);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const getStatusColor = (status: string | undefined) => {
    const statusColors: { [key: string]: string } = {
      PENDING: "bg-yellow-500",
      SHORTLISTED: "bg-blue-500",
      REJECTED: "bg-red-500",
      ACCEPTED: "bg-green-500",
      REVIEWING: "bg-purple-500",
      INTERVIEWED: "bg-indigo-500",
      WITHDRAWN: "bg-gray-500",
      OFFERED: "bg-teal-500",
    };
    return statusColors[status || ""] || "bg-gray-300";
  };



  return (
    <>
      <div className="p-6">
        <ScrollArea className="flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
          <h1 className="text-5xl font-bold text-purple-600">Jobs You&apos;ve Created</h1>
          <p className="text-xl font-bold text-gray-400">
            You can also view applications for specific jobs
          </p>

          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg mt-4">
            <Table className="w-full">
              <TableHeader className="bg-black">
                <TableRow>
                  <TableHead className="w-[50px] text-white">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="text-white text-left">Job Id</TableHead>
                  <TableHead className="text-white">Job Name</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                  <TableHead className="text-right text-white">View Application</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{job.id ?? "N/A"}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>
                      {job.id !== undefined && job.id !== null && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(job.id)}
                          >
                            <PencilIcon className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteJob(job.id)}
                          >
                            <TrashIcon className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="link"
                        onClick={() => handleOpenModal(job.id)}
                        className="text-blue-600 hover:underline"
                      >
                        View Applications
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} name="Application">
        <div className="max-h-[80vh] overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-bold">Applications for Job ID: {selectedJobId}</h2>
          </div>

          {fetchingApplications ? (
            <div className="p-6">
              <p className="text-center text-gray-500">Loading applications...</p>
            </div>
          ) : applications.length > 0 ? (
            <ScrollArea className="h-[calc(80vh-100px)] px-6">
              <div className="space-y-6 py-6">
                {applications.map((app) => {
                  const baseUrl = "http://localhost:4000"; // Change this to match the backend domain
                  const resumeUrl = app.resumeUrl?.startsWith("http") ? app.resumeUrl : `${baseUrl}${app.resumeUrl}`;

                  return (

                    <Card key={app.id ?? 0} className="overflow-hidden">
                      <CardHeader className="bg-gray-50">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">
                            {app.user?.name ?? "Unknown User"}
                          </CardTitle>
                          <Badge className={getStatusColor(app.status)}>
                            {app.status ?? "Unknown"}
                          </Badge>
                          <Select
                            value={app.status ?? ""}
                            onValueChange={(newValue) => handleStatusChange(newValue, app.id)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PENDING">Pending</SelectItem>
                              <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                              <SelectItem value="REJECTED">Rejected</SelectItem>
                              <SelectItem value="ACCEPTED">Accepted</SelectItem>
                              <SelectItem value="REVIEWING">Reviewing</SelectItem>
                              <SelectItem value="INTERVIEWED">Interviewed</SelectItem>
                              <SelectItem value="WITHDRAWN">Withdrawn</SelectItem>
                              <SelectItem value="OFFERED">Offered</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid gap-6">
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-4 space-y-2">
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{app.user?.email ?? "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Applied On</p>
                                <p className="font-medium">
                                  {app.appliedAt
                                    ? new Date(app.appliedAt).toLocaleDateString()
                                    : "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-black">Expected Salary</p>
                                <p className="font-medium">{app.expectedSalary}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Notice Period</p>
                                <p className="font-sm">{app.noticePeriod}</p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h4 className="font-semibold mb-2">Education</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Degree</p>
                                <p className="font-medium">{app.applicationDetails?.education?.degree ?? "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">University</p>
                                <p className="font-medium">{app.applicationDetails?.education?.university ?? "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Graduation Year</p>
                                <p className="font-medium">{app.applicationDetails?.education?.graduationYear ?? "N/A"}</p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h4 className="font-semibold mb-2">Work Experience</h4>
                            <div className="space-y-4">
                              {app.applicationDetails?.workExperience?.companies.map((company, index) => (
                                <div key={index} className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Company</p>
                                    <p className="font-medium">{company.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Position</p>
                                    <p className="font-medium">{company.position}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className="font-medium">{company.duration}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h4 className="font-semibold mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {app.applicationDetails?.skills?.map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h4 className="font-semibold mb-2">Additional Information</h4>
                            <p className="text-gray-700">{app.applicationDetails?.additionalInfo}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Cover Letter</h4>
                            <p className="text-gray-700">{app.coverLetter}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Resume</h4>
                              <Button variant="outline" className="w-full">
                                <a
                                  href={resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Resume
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="p-6">
              <p className="text-center text-gray-500">No applications found for this job.</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default JobOffer;