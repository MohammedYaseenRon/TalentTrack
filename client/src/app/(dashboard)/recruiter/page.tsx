"use client";

import Applications from '@/components/Application'
import JobOffer from '@/components/JobOffer'
import Overview from '@/components/overview'
import { Button } from '@/components/ui/button'
import { Card,CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowUpRight, Briefcase, Calendar, FileText, Users } from 'lucide-react'
import React, { useState } from 'react'

const RecruiterDashboard = () => {
  const [isModalOpen,setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-end">  
        <Button onClick={handleOpenModal}>
          <Briefcase className='w-4 h-4 mr-2' />
           Post Job
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
        <Card className='bg-gradient-to-br from-blue-500 to-blue-600 text-white'>
          <CardHeader className='flex flex-row justify-between items-center pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium'>Total applicants</CardTitle>
            <Users className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-sm font-medium opacity-75">+10% from last Month</p>
            <Progress value={70} className="mt-2 bg-blue-200" />
          </CardContent>
        </Card>
        <Card className='bg-white text-black'>
          <CardHeader className='flex flex-row justify-between items-center pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium'>Pending Reviews</CardTitle>
            <FileText className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-sm font-medium opacity-75">12 urgent</p>
            <Progress value={70} className="mt-2 bg-blue-200" />
          </CardContent>
        </Card>
        <Card className='bg-white text-black'>
          <CardHeader className='flex flex-row justify-between items-center pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium'>Scheduled Interviews</CardTitle>
            <Calendar className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-sm font-medium opacity-75">This week</p>
            <Progress value={70} className="mt-2 bg-blue-200" />
          </CardContent>
        </Card>
        <Card className='bg-gradient-to-br from-green-500 to-green-600 text-white'>
          <CardHeader className='flex flex-row justify-between items-center pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium'>Offer Acceptance Rate</CardTitle>
            <ArrowUpRight className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-sm font-medium opacity-75">+5% from last quarter</p>
            <Progress value={70} className="mt-2 bg-blue-200" />
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 lg:grid-cols-7 md:grid-cols-2'>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Hiring Pipiline Overview</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Applications />
          </CardContent>
        </Card>

      </div>
      <JobOffer 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        name="Create a Job"
        // width='max-w-md'
      />

    </div>
  )
}

export default RecruiterDashboard