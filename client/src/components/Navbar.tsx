import React from 'react'
import { Button } from './ui/button'
import { User } from 'lucide-react';
import Logo from './Logo';

export default function Navbar (){
  return (
    <div className='fixed bg-[#FFFFFF] shadow-lg w-full h-16 z-50'>
        <div className='max-w-screen-xl mx-auto px-4 flex items-center justify-between h-full'>
            <Logo />
            <div className='flex items-center ml-auto space-x-3'>
                <Button className='bg-[#FF6B6B] text-white hover:bg-gray- hover:text-black font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0'>
                    <h1 className='text-lg font-bold'>Login</h1>
                    <User size={12} />
                </Button>
                {/* <Button className='text-base bg-[#FF6B6B]'>Get Started</Button>   */}
            </div> 
        </div>

    </div>
  )
}
