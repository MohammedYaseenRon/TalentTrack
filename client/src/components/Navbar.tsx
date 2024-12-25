"use client";
import React,{useState} from 'react'
import { Button } from './ui/button'
import Image from 'next/image';
import { User } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='bg-white shadow-lg w-full h-16 rounded-lg'>
        <div className='max-w-screen-xl mx-auto px-4 flex items-center justify-between h-full'>
            <div className='flex items-center space-x-2'>
                {/* <Link href="/"><Image 
                src="/"
                alt='Talent Tracks'
                width={100}
                height={100}
                className='h-full' /></Link> */}
                <span className='text-xl text-gray-800 font-bold'>Talents Tracks</span>
            </div>
            <div className='flex items-center ml-auto space-x-3'>
                <Button className='bg-white text-gray-700 hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0'>
                    <User size={10} />
                </Button>
                <Button className='text-base'>Get Started</Button>  
            </div> 
        </div>

    </div>
  )
}

export default Navbar