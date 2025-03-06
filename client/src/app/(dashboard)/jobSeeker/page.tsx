"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CheckCircle, File, Folder, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateProject from '@/components/CreateProject';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import content from '@/components/content';
import { AnalysisResponse, ResumeAnalysis } from '@/state/api';
import ResumeAnalysisSkeleton from '@/components/ResumeSkeleton';



export default function JobSeeker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resume, setResume] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedAnalysis, setParsedAnalysis] = useState<ResumeAnalysis | null>(null)



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
      console.log("Selected File:", e.target.files[0]);
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resume) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    console.log("Formdata Contend:", formData.get("resume"));


    try {
      setLoading(true);
      setError(null);
      setAnalysis(null);
      const response = await axios.post("http://localhost:4000/user/resume", formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      setAnalysis(response.data);
      if (response.data && response.data.analysis) {
        try {
          const jsonString = response.data.analysis.replace(/```json\n/, '').replace(/\n```$/, '');
          const parsedData = JSON.parse(jsonString);
          setParsedAnalysis(parsedData);
        } catch (error) {
          console.error("Error parsing analysis JSON:", error);
          setError("Failed to parse the resume analysis data");
        }
      }
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      setError("Failed to analyze the resume");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }


  return (
    <div className='w-full p-4 h-screen overflow-y-auto'>
      <div className='flex flex-row-reverse mb-4'>
        <Button onClick={handleOpenModal} className='text-white hover:bg-blue-800 text-lg bg-blue-600 px-8 py-2'>Add Project</Button>
      </div>
      <div className='text-center'>
        <h1 className='text-2xl font-medium'>Check your Resume before sending to Recruiter</h1>
        <div className='max-w-xl lg:max-w-3xl mx-auto bg-gray-100 border rounded-xl h-[200px] mt-2 flex flex-col items-center justify-center'>
          <Label htmlFor='resume' className='text-base font-medium'>
            <File className='w-12 h-12' />
          </Label>
          <Input
            id='resume'
            name='Resume'
            accept='.pdf,.docs'
            placeholder='Resume'
            className='hidden'
            onChange={handleFileChange}
            type='file'
          />
          {resume && <p className="text-sm mt-2 font-bold text-gray-700">{resume.name}</p>}

          <p className='text-red-400 p-2 text-lg font-medium'>Upload</p>
          <Button onClick={handleUpload} className='text-lg fonr-medium bg-black'>Analyze Resume</Button>
        </div>
      </div>
      <div className="mt-8 mb-16 max-w-xl lg:max-w-3xl mx-auto">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading ? (
          <ResumeAnalysisSkeleton />
        ) : (
        parsedAnalysis && (
        <Card>
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="text-xl font-bold flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              Resume Analysis {analysis?.fileName ? `for ${analysis.fileName}` : ''}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 mb-8">
            {/* Score */}
            <div className="mb-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Resume Strength Score</h3>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-blue-600">{parsedAnalysis.final_evaluation.score}/100</div>
              </div>
            </div>

            {/* Final Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Final Summary</h3>
              <p className="text-gray-700">{parsedAnalysis.final_evaluation.summary}</p>
            </div>

            {/* Personal Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-2">{parsedAnalysis.personal_information.details}</p>
              {parsedAnalysis.personal_information.missing.length > 0 && (
                <div className="mb-2">
                  <span className="font-medium">Missing: </span>
                  <span>{parsedAnalysis.personal_information.missing.join(", ")}</span>
                </div>
              )}
              <p className="text-gray-700 italic">{parsedAnalysis.personal_information.suggestions}</p>
            </div>

            {/* Summary Analysis */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Summary</h3>
              <p className="text-gray-700 mb-2">{parsedAnalysis.summary_analysis.assessment}</p>
              <p className="text-gray-700 italic">{parsedAnalysis.summary_analysis.suggestions}</p>
            </div>

            {/* Work Experience */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Work Experience</h3>
              <p className="text-gray-700 mb-2">{parsedAnalysis.work_experience.evaluation}</p>
              <p className="text-gray-700 mb-2">{parsedAnalysis.work_experience.achievements}</p>
              <p className="text-gray-700 italic">{parsedAnalysis.work_experience.suggestions}</p>
            </div>

            {/* Skills & Technologies */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Skills & Technologies</h3>
              <div className="mb-3">
                <h4 className="font-medium">Technical Skills:</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {parsedAnalysis.skills_technologies.technical_skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {parsedAnalysis.skills_technologies.soft_skills.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium">Soft Skills:</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {parsedAnalysis.skills_technologies.soft_skills.map((skill, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-gray-700 italic">{parsedAnalysis.skills_technologies.suggestions}</p>
            </div>

            {/* Education & Certifications */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Education & Certifications</h3>
              <p className="text-gray-700 mb-2">{parsedAnalysis.education_certifications.details}</p>
              <p className="text-gray-700 mb-2">{parsedAnalysis.education_certifications.relevance}</p>
              <p className="text-gray-700 italic">{parsedAnalysis.education_certifications.suggestions}</p>
            </div>

            {/* Projects & Contributions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Projects & Contributions</h3>
              <p className="text-gray-700 mb-2">{parsedAnalysis.projects_contributions.analysis}</p>
              <p className="text-gray-700 italic">{parsedAnalysis.projects_contributions.suggestions}</p>
            </div>

            {/* ATS Compatibility */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">ATS Compatibility</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium mb-1">Formatting</h4>
                  <p className="text-gray-700 text-sm">{parsedAnalysis.ats_compatibility.formatting}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium mb-1">Keywords</h4>
                  <p className="text-gray-700 text-sm">{parsedAnalysis.ats_compatibility.keywords}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium mb-1">Readability</h4>
                  <p className="text-gray-700 text-sm">{parsedAnalysis.ats_compatibility.readability}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">{parsedAnalysis.ats_compatibility.suggestions}</p>
            </div>

            {/* Download/Save Options */}
            <div className="mt-6 flex justify-end">
              <Button className="bg-blue-600 text-white mr-2">
                Download Analysis
              </Button>
              <Button className="bg-gray-200 text-gray-800">
                Save to Profile
              </Button>
            </div>
          </CardContent>
        </Card>
          )
        )}
      </div>
      <CreateProject
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        name="Create Project"
        className=""
      />
    </div>
  );
}
