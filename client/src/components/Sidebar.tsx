"use client";

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Home, Folder, BarChart, Users, Settings, LayoutDashboard, Calendar,Briefcase, FileText, Mail, TypeIcon as type, LucideIcon } from 'lucide-react'
import { Button } from './ui/button';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import Link from 'next/link';
import { cn } from '@/lib/utils'



interface MenuItems {
    icon: string;
    label: string;
    href: string

}

interface SidebarProps {
    className?: string
    menuItems: MenuItems[];
    title: string
}

const iconMap: { [key: string]: LucideIcon } = {
    Home, Folder, BarChart, Users, Settings, LayoutDashboard, Calendar, FileText, Mail,Briefcase
};

export const Sidebar: React.FC<SidebarProps> = ({ className, menuItems, title = "Dashboard" }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSideBar = () => setIsOpen(!isOpen)


    return (
        <div className={cn("flex flex-col h-screen bg-[#1a1f2e] border-r border-r-accent text-white transition-all duration-300",
            isOpen ? "w-64" : "w-16",
            className
        )}>
            <div className="flex items-center justify-between p-4">
                {isOpen && <h1 className='text-xl font-medium ml-2'>Dashboard</h1>}
                <Button variant="ghost" size="icon" onClick={toggleSideBar} aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}>
                    {isOpen ? <ChevronLeft /> : <ChevronRight />}
                </Button>
            </div>
            <ScrollArea className="flex-1 px-3">
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = iconMap[item.icon];
                        return (
                            <Link key={item.label} href={item.href} className={cn("flex items-center space-x-2 px-3 py-2 text-white hover:bg-gray-800 hover:text-white transition-colors",
                                !isOpen && "justify-center px-2"
                            )}>
                                {Icon && <Icon size={20} />}
                                {isOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>
        </div>
    )
}
