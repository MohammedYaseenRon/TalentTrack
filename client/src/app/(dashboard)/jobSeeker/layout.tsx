import Header from '@/components/Header'
import { Sidebar } from '@/components/Sidebar';
import React from 'react';




interface JobSeekerLayoutProps {
  children: React.ReactNode;
}


const jobSeekerMenuItems = [
  { icon: "Home", label: 'Dashboard', href: "/jobSeeker" },
  { icon: "Folder", label: 'Projects', href: "/jobSeeker/projects" },
  { icon: "Briefcase", label: 'Jobs', href: "/jobSeeker/jobs" },
  { icon: "BarChart", label: 'Project Details', href: "/jobSeeker/projectDetails" },
  { icon: "Users", label: 'Team', href: "/jobSeeker/team" },
  { icon: "Settings", label: 'Settings', href: "/jobSeeker/settings" },
];

const JobSeekerlayout:React.FC<JobSeekerLayoutProps> = ({children}) => {
  return (
    <div className='flex h-screen overflow-hiddem'>
      <Sidebar menuItems={jobSeekerMenuItems} title="Job Seeker Dashboard" />
      <div className='flex-1 flex flex-col overflow-hidden'>
          <Header />  
        <main className='flex-1'>
            {children}
        </main>
        </div>
    </div>
  )
}

export default JobSeekerlayout