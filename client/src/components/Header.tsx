"use client";
import React, { useState } from 'react'
import Logo from './Logo'
import { Bell, HomeIcon, User2 } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import Profilepage from './Profilepage'



const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='sticky bg-white/50 top-0 z-50 w-full border-b shadow-lg backdrop-blur-xl'>
      <div className='px-6 h-16 flex items-center'>
        <div className='flex items-center gap-8'>
          <Logo />
        </div>
        <div className='flex items-center gap-4 ml-auto'>
          <div className='flex items-center gap-4 sm:gap-6'>
            <button className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-accent">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </button>
            <button onClick={handleOpenModal} className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-accent">
              <div className="w-16 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <User2 className="w-10 h-5 rounded-full text-blue-500" />
              </div>
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="absolute right-4 top-14">
          <Profilepage
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            name="Profile"
            className="relative"
            width='max-w-md'
            height="h-[60vh]"
          />
        </div>
      )}


    </div>
  )
}

export default Header