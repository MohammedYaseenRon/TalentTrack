import Header from '@/components/Header'
import { Sidebar } from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react'



interface JobSeekerLayoutProps {
  children: React.ReactNode;
}

const JobSeekerlayout:React.FC<JobSeekerLayoutProps> = ({children}) => {
  return (
    <div className='flex h-screen overflow-hiddem'>
      <Sidebar />
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