import Header from '@/components/Header'
import { Sidebar } from '@/components/Sidebar';
import React from 'react';


interface RecruiterlayoutProps {
  children: React.ReactNode;
}

const recruiterMenuItems = [
    { icon: "LayoutDashboard", label: 'Dashboard', href: "/recruiter" },
    { icon: "Users", label: 'Candidates', href: "/recruiter/candidates" },
    { icon: "FileText", label: 'Job Offers', href: "/recruiter/jobOffer" },
    { icon: "Calendar", label: 'Interviews', href: "/recruiter/interview" },
    { icon: "CheckSquare", label: 'Task', href: "/recruiter/task" },
    { icon: "Settings", label: 'Settings', href: "/recruiter/settings" },
];


const Recruiterlayout:React.FC<RecruiterlayoutProps> = ({children}) => {
  return (
    <div className='flex h-screen overflow-hiddem'>
      <Sidebar menuItems={recruiterMenuItems}  title="Recruiter"/>
        <div className='flex-1 flex flex-col overflow-hidden'>
          <Header />  
        <main className='flex-1 overflow-y-auto p-4'>
            {children}
        </main>
        </div>
    </div>
  )
}

export default Recruiterlayout