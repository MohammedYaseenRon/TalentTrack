"use client";

import React, { useEffect, useState } from 'react'
import { JobOfferProps } from '@/state/api'
import axios from 'axios'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Modal from '@/components/Modal'
import { ApplicationsForm } from '@/state/api'
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface ApplicationProps {
  id: number
  user: {
    id: number
    name: string
    email: string
  }
  status: string
  appliedAt: string
  jobId: number
  applicationDetails: ApplicationsForm
}

const JobOffer = () => {
  const [jobs, setJobs] = useState<JobOfferProps[]>([])
  const [applications, setApplications] = useState<ApplicationProps[]>([])
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fetchingApplications, setFetchingApplications] = useState(false)
  const [status, setStatus] = useState<string>("");



  const handleEdit = (jobId: number) => {
    console.log("Edit", jobId)
  }

  const handleDelete = (jobId: number) => {
    console.log("Delete this job", jobId)
  }

  const handleOpenModal = (jobId: number) => {
    setSelectedJobId(jobId)
    setApplications([])
    setIsModalOpen(true)
    fetchApplication(jobId)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedJobId(null)

  }

  const handleStatuseChange = (newStatus: string, applicationId: number) => {
    setStatus(newStatus)
    updateApplicationStatus(applicationId, newStatus);

  }

  const fetchApplication = async (jobId: number) => {
    setFetchingApplications(true)
    try {
      const response = await axios.get(`http://localhost:4000/application/job/${jobId}`)
      setApplications(response.data)
      console.log(response.data);
      setSelectedJobId(jobId)
    } catch (error) {
      console.error("Error while fetching application", error)
    } finally {
      setFetchingApplications(false)
    }
  }

  const updateApplicationStatus = async (applicationId: number, newStatus: string) => {
    try {
      const response = await axios.patch(`http://localhost:4000/application/${applicationId}/status`,
        { status: newStatus }
      );
      console.log(response);

      if (response.status == 200) {
        setApplications((prevApplication) =>
          prevApplication.map((app) =>
            app.id == applicationId ? { ...app, status: newStatus } : app
          )
        )
      } else {
        throw new Error('Failed to update application status');
      }

    } catch (error) {
      console.error('Error updating status', error);
      setError('Failed to update application status');
    }

  }


  useEffect(() => {
    const fetchJobsList = async () => {
      try {
        const response = await axios.get("http://localhost:4000/jobs")
        setJobs(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error while fetching Jobs", error)
        setLoading(false)
      }
    }

    fetchJobsList()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const getStatusColor = (status: string) => {
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
    return statusColors[status] || "bg-gray-300";
  };


  return (
    <>
      <div className="p-6">
        <ScrollArea className="flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
          <h1 className="text-5xl font-bold text-purple-600">Jobs You've Created</h1>
          <p className="text-xl font-bold text-gray-400">You can also view applications for specific jobs</p>

          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg mt-4">
            <Table className="w-full">
              <TableHeader className="bg-black">
                <TableRow>
                  <TableHead className="w-[50px] text-white">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="text-white">Job Id</TableHead>
                  <TableHead className="text-white">Job Name</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                  <TableHead className="text-right text-white mr-4">View Application</TableHead>
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
                            onClick={() => handleDelete(job.id)}
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
                {applications.map((app) => (
                  <Card key={app.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{app.user.name}</CardTitle>
                        <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        <Select
                          value={app.status}
                          onValueChange={(newValue) => handleStatuseChange(newValue, app.id)}
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
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium">{app.user.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Applied On</p>
                              <p className="font-medium">{new Date(app.appliedAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Expected Salary</p>
                              <p className="font-medium">{app.applicationDetails.expectedSalary}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Notice Period</p>
                              <p className="font-medium">{app.applicationDetails.noticePeriod}</p>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold mb-2">Education</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Degree</p>
                              <p className="font-medium">{app.applicationDetails.education.degree}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">University</p>
                              <p className="font-medium">{app.applicationDetails.education.university}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Graduation Year</p>
                              <p className="font-medium">{app.applicationDetails.education.graduationYear}</p>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold mb-2">Work Experience</h4>
                          <div className="space-y-4">
                            {app.applicationDetails.workExperience.companies.map((company, index) => (
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
                            {app.applicationDetails.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold mb-2">Additional Information</h4>
                          <p className="text-gray-700">{app.applicationDetails.additionalInfo}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Cover Letter</h4>
                          <p className="text-gray-700">{app.applicationDetails.coverLetter}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Resume</h4>
                            <Button
                              variant="outline"
                              asChild
                              className="w-full"
                            >
                              <a
                                href={app.applicationDetails.resumeUrl}
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
                ))}
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
  )
}

export default JobOffer
