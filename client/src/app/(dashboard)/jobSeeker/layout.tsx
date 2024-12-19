import Header from '@/components/Header'
import { Sidebar } from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react'



interface JobSeekerLayoutProps {
  children: React.ReactNode;
}

const JobSeekerlayout:React.FC<JobSeekerLayoutProps> = ({children}) => {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
        <div className='flex-1'>
          <Header />  
        <main className='container mx-auto p-6'>
            {children}
        </main>
        </div>
    </div>
  )
}

export default JobSeekerlayout