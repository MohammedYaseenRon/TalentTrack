import React from 'react'
import Logo from './Logo'
import { Bell, HomeIcon, User } from 'lucide-react'



const Header = () => {
  return (
    <div className='bg-white shadow-lg'>
        <div className='p-2 h-20 rounded-2xl bg-gray-400 flex justify-between items-center'>
            <div>
              <Logo />
            </div>
            <div className='flex items-center gap-2'>
              <HomeIcon className='w-5 h-5 text' />
              <h1 className='font-medium text-base md:text-lg text-black'>
                My Activities
              </h1>
            </div>
            <div className='flex items-center gap-6 sm:gap-6'>
              <div className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer transition-colors'>
                <Bell />
              </div>
              <div className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer transition-colors'>
                <User />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Header