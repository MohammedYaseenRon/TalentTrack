"use client";

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Home, Folder, BarChart, Users, Settings, type LucideIcon } from 'lucide-react'
import { Button } from './ui/button';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import Link from 'next/link';
import { cn } from '@/lib/utils'



interface MenuItems {
    icon:LucideIcon;
    label:string;
    href:string

}

interface SidebarProps{
    className?:string
}

export const Sidebar:React.FC<SidebarProps> = ({className}) => {
    const [isOpen,setIsOpen] = useState(true);

    const toggleSideBar = () => setIsOpen(!isOpen)

    const menuItems: MenuItems[] = [
        { icon:Home, label:'Dashboard',href:"/jobSeeker " },
        { icon:Folder, label:'Projects',href: "/jobSeeker/projects" },
        { icon:BarChart, label:'Project Details',href:"/jobSeeker/projectDetails" },
        { icon:Users, label:'Team',href:"/" },
        { icon:Settings, label:'Settings',href:"/" },
        
    ]

  return (
    <div className={cn("flex flex-col h-screen bg-[#1a1f2e] border-r border-r-accent text-white transition-all duration-300",
        isOpen ? "w-64" : "w-16",
        className
    )}>
        <div className="flex items-center justify-between p-4">
            {isOpen &&  <h1 className='text-xl font-medium ml-2'>Dashboard</h1>}
            <Button variant="ghost" size="icon" onClick={toggleSideBar} aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}>
                {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>
        </div>
        <ScrollArea className="flex-1 px-3">
            <nav className="space-y-1">
                {menuItems.map((item) => (
                    <Link key={item.label} href={item.href} className={cn("flex items-center space-x-2 px-3 py-2 text-white hover:bg-gray-800 hover:text-white transition-colors",
                        !isOpen && "justify-center px-2"
                    )}>
                        <item.icon size={20} />
                        {isOpen && <span>{item.label}</span>}
                    </Link>
                ))}
            </nav>
        </ScrollArea>
    </div>
  )
}
