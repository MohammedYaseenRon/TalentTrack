import React, { useState } from "react"
import type { ApplicationProps } from "@/state/api"
import { Card, CardContent } from "./ui/card"
import Modal from "./Modal"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import type { JobOfferProps } from "@/state/api"
import axios from "axios"
import toast from "react-hot-toast"
import { TagInput } from "./TagInput"
import { jwtDecode } from "jwt-decode"

interface MainApplicationProps {
  isOpen: boolean
  onClose: () => void
  name: string
  job: JobOfferProps | null
}
interface CustomJwtPayload {
  userId?: string // `userId` is optional, so TypeScript won't throw an error if it's missing
  role: string
  exp?: number // Add the exp property as an optional number
}

export const MainApplication: React.FC<MainApplicationProps> = ({ isOpen, onClose, name, job }) => {
  const [formData, setFormData] = useState<ApplicationProps>({
    id: 1,
    resumeUrl: null,
    coverLetter: "",
    noticePeriod: "",
    expectedSalary: "",
    applicationDetails: {
      id: 0,
      applicationId: 0,
      education: {
        degree: "",
        university: "",
        graduationYear: "",
      },
      workExperience: {
        companies: [
          {
            name: "",
            position: "",
            duration: "",
          },
        ],
      },
      skills: [],
      additionalInfo: "",
    },
  });
  if (!isOpen) return null


  const getUserId = () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No token found in localStorage")
        return null
      }

      const decoded = jwtDecode<CustomJwtPayload>(token)

      if (!decoded.userId) {
        console.error("No userId found in decoded token")
        return null
      }

      // Check if token is expired (optional: validate the expiry)
      const currentTime = Date.now() / 1000 // Current time in seconds
      if (decoded.exp && currentTime > decoded.exp) {
        console.error("Token is expired")
        return null
      }

      return decoded.userId
    } catch (error) {
      console.error("Error decoding token:", error)
      return null
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (name === "additionalInfo") {
      setFormData((prev) => ({
        ...prev,
        applicationDetails: {
          ...prev.applicationDetails!,
          additionalInfo: value,
        },
      }))
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null
      setFormData((prev) => ({ ...prev, [name]: file }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      applicationDetails: {
        ...prev.applicationDetails!,
        education: {
          ...prev.applicationDetails!.education!,
          [id]: value,
        },
      },
    }))
  }





  const handleWorkExperienceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      applicationDetails: {
        ...prev.applicationDetails!,
        workExperience: {
          companies:
            prev.applicationDetails?.workExperience?.companies.map((company, i) =>
              i === index ? { ...company, [name]: value } : company,
            ) || [],
        },
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const userId = getUserId()
    if (!userId) {
      toast.error("Authentication token required")
      return
    }

    const { resumeUrl, coverLetter, noticePeriod, expectedSalary, applicationDetails } = formData
    const { education, workExperience, skills, additionalInfo } = applicationDetails || {};


    if (
      !job ||
      !job.id ||
      !userId ||
      !resumeUrl ||
      !coverLetter.trim() ||
      !noticePeriod.trim() ||
      !expectedSalary.trim() ||
      !education?.degree.trim() ||
      !education?.university.trim() ||
      !education?.graduationYear ||
      workExperience?.companies.some(
        (company) => !company.name.trim() || !company.position.trim() || !company.duration.trim()
      ) ||
      skills?.length === 0 ||
      !additionalInfo?.trim()
    ) {
      toast.error("All fields are required for submitting the application.")
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('jobId', job.id.toString())
      formDataToSend.append('userId', userId)
      formDataToSend.append('coverLetter', coverLetter)
      formDataToSend.append('noticePeriod', noticePeriod)
      formDataToSend.append('expectedSalary', expectedSalary)
      formDataToSend.append('education', JSON.stringify(education))
      formDataToSend.append('workExperience', JSON.stringify(workExperience))
      formDataToSend.append('skills', JSON.stringify(skills))
      formDataToSend.append('additionalInfo', additionalInfo)
      formDataToSend.append('resume', resumeUrl)

      const token = localStorage.getItem("token")
      const response = await axios.post("http://localhost:4000/application", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data);

      toast.success("Application created successfully.")
      onClose()
      setFormData({
        id: 1,
        resumeUrl: null,
        coverLetter: "",
        noticePeriod: "",
        expectedSalary: "",
        applicationDetails: {
          id: 0,
          applicationId: 0,
          education: {
            degree: "",
            university: "",
            graduationYear: "",
          },
          workExperience: {
            companies: [
              {
                name: "",
                position: "",
                duration: "",
              },
            ],
          },
          skills: [],
          additionalInfo: "",
        }
      })
    } catch (error) {
      console.error("Error while creating application:", error)
      toast.error("Failed to create application. Please try again.")
    }
  }

  const handleAddSkill = (skill: string) => {
    if (skill && formData.applicationDetails?.skills && !formData.applicationDetails?.skills?.includes(skill)) {
      setFormData((prev) => ({
        ...prev, applicationDetails:{
          ...prev.applicationDetails!,
          skills: [...(prev.applicationDetails?.skills || []), skill],
        }
      }))
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,applicationDetails: {
        ...prev.applicationDetails!,
        skills: prev.applicationDetails?.skills?.filter((s) => s !== skill) || [],
      },
    }))
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
              <Label className="text-sm font-medium text-gray-700" htmlFor="resume">
                Resume Url
              </Label>
              <Input
                id="resumeUrl"
                name="resumeUrl"
                type="file"
                accept=".pdf,.doc,.docx"
                placeholder="Resume url"
                onChange={handleInputChange}
                className="w-full h-[50px] text-black"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700" htmlFor="projectDescription">
                Cover Letter
              </Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                placeholder="Why we should consider you"
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="w-full h-[200px] text-black"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700" htmlFor="Tags">
                  Expected Salary
                </Label>
                <Input
                  id="expectedSalary"
                  name="expectedSalary"
                  placeholder="Enter your expected salary"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                  className="w-full h-[50px] text-black"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700" htmlFor="Tags">
                  Notice Period
                </Label>

                <Select
                  value={formData.noticePeriod}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, noticePeriod: value }))}
                >
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
                <Label className="text-sm font-medium text-gray-700" htmlFor="degree">
                  Degree
                </Label>
                <Input
                  id="degree"
                  placeholder="Degree"
                  value={formData.applicationDetails?.education?.degree}
                  onChange={handleEducationChange}
                  className="w-full h-[50px] text-black"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700" htmlFor="livedemo">
                  University
                </Label>
                <Input
                  id="university"
                  placeholder="University"
                  value={formData.applicationDetails?.education?.university}
                  onChange={handleEducationChange}
                  className="w-full h-[50px] text-black"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700" htmlFor="graduationYear">
                  Graduation Year
                </Label>
                <Input
                  id="graduationYear"
                  placeholder="Enter your Graduation salary"
                  value={formData.applicationDetails?.education?.graduationYear}
                  onChange={handleEducationChange}
                  className="w-full h-[50px] text-black"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Work Experience</Label>
              {formData.applicationDetails?.workExperience?.companies.map((company, index) => (
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
              <Label className="text-sm font-medium text-gray-700" htmlFor="sourcecode">
                Skills
              </Label>
              <TagInput tags={formData.applicationDetails?.skills || []} onAddTag={handleAddSkill} onRemoveTag={handleRemoveSkill} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700" htmlFor="projectDescription">
                Additional Info
              </Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                placeholder="Enter any additional Information"
                value={formData.applicationDetails?.additionalInfo}
                onChange={handleInputChange}
                className="w-full h-[200px] text-black"
                rows={4}
              />
            </div>

            <div className="flex flex-row-reverse">
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

