import React from 'react'
import Logo from './Logo'
import { Bell, HomeIcon, User } from 'lucide-react'
import { Button } from './ui/button'



const Header = () => {
  return (
    <div className='sticky bg-white/50 top-0 z-50 w-full border-b shadow-lg backdrop-blur-xl'>
        <div className='px-6 h-16 flex items-center'>
            <div className='flex items-center gap-8'>
              <Logo />
            </div>
            <div className='flex items-center gap-4 ml-auto'>
              <div className='flex items-center gap-2'>
                <HomeIcon className='w-5 h-5 text' />
                <span className='font-medium text-base md:text-lg text-black'>
                  My Activities
                </span>
              </div>
              <div className='flex items-center gap-4 sm:gap-6'>
                <button className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-accent">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-accent">
                  <User className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Header