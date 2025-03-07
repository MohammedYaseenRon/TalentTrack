"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Megaphone, Eye, Calendar, User, Settings, Search, Handshake } from "lucide-react";

interface Step {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const recruiterSteps: Step[] = [
    {
        title: "Create Your Account",
        description: "Sign up and complete your company profile with all relevant details.",
        icon: <FileText size={24} />
    },
    {
        title: "Post Job Openings",
        description: "Create detailed job listings with requirements, benefits, and company culture.",
        icon: <Megaphone size={24} />
    },
    {
        title: "Review Applicants",
        description: "Browse through matched candidates and review their profiles and portfolios.",
        icon: <Eye size={24} />
    },
    {
        title: "Schedule Interviews",
        description: "Connect directly with promising candidates and manage the interview process.",
        icon: <Calendar size={24} />
    }
];

const jobSeekerSteps: Step[] = [
    {
        title: "Build Your Profile",
        description: "Create your professional profile showcasing skills, experience, and portfolio.",
        icon: <User size={24} />
    },
    {
        title: "Set Preferences",
        description: "Specify your desired roles, industries, salary expectations, and work arrangements.",
        icon: <Settings size={24} />
    },
    {
        title: "Discover Opportunities",
        description: "Browse matched job postings or receive notifications about relevant positions.",
        icon: <Search size={24} />
    },
    {
        title: "Apply & Connect",
        description: "Apply to positions with a single click and schedule interviews with interested companies.",
        icon: <Handshake size={24} />
    }
];

const drawLine = {
    hidden: { pathLength: 0 },
    visible: {
        pathLength: 1,
        transition: {
            duration: 1.5,
            ease: "easeInOut"
        }
    }
};

const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
            delay: 0.2 * custom,
            duration: 0.5
        }
    })
};

const contentVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: (custom: number) => ({
        opacity: 1,
        x: custom % 2 === 0 ? -20 : 20, // Different animation direction for left/right
        transition: {
            delay: 0.3 * custom,
            duration: 0.5
        }
    })
};

export default function Working(){
    const [activeTab, setActiveTab] = useState('recruiter');

    return (
        <div className="bg-[#F8F1F1] py-16 px-4 sm:px-6 lg:px-8 rounded-xl shadow-sm">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl text-[#1E1E1E] font-extrabold mb-4">How Talents Tracks Works</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our platform connects talented professionals with top companies through an intuitive, streamlined process.</p>
                </div>
            </div>
            <div className="flex justify-center mb-12">
                <div className="bg-white p-1 rounded-lg shadow-md flex">
                    <button onClick={() => setActiveTab('recruiter')} className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 ${activeTab === 'recruiter' ? 'bg-[#FF6B6B] text-white text-base' : 'text-gray-700 hover:bg-gray-100'}`} >
                        For Recruiters
                    </button>
                    <button onClick={() => setActiveTab('jobseeker')} className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 ${activeTab === 'jobseeker' ? 'bg-[#FF6B6B] text-white text-base' : 'text-gray-700 hover:bg-gray-100'}`} >
                        For Job-Seekers
                    </button>
                </div>
            </div>
            {/* <div className="relative mb-16">
                <motion.div
                    className="relative max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    key={activeTab}
                >
                    <Image
                        src="/images/project1.png"
                        alt="DashBoard"
                        width={600}
                        height={400}
                        className="w-full h-[400px] shadow-lg"
                    />
                </motion.div>
            </div> */}

            <div className="relative flex justify-center mt-32 mb-32">
                {/* SVG for vertical tree lines */}
                <svg className="absolute h-full" style={{ width: '10px', height: '100%', left: 'calc(50% - 5px)', top: 0 }} viewBox="0 0 10 800" preserveAspectRatio="none">
                    <motion.path
                        d="M5,0 L5,800"
                        stroke="#FF6B6B"
                        strokeWidth="4"
                        strokeDasharray="8 4"
                        fill="none"
                        variants={drawLine}
                        initial="hidden"
                        animate="visible"
                    />
                </svg>

                {/* Root Node */}
                <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-16 z-10"
                    variants={nodeVariants}
                    custom={0}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="w-16 h-16 ml-2 rounded-full bg-[#FF6B6B] flex items-center justify-center border-4 border-white">
                        <span className="text-xl text-white font-bold">
                            {activeTab === 'recruiter' ? '👔' : '🧑‍💼'}
                        </span>
                    </div>
                    <div className="absolute top-full mt-2 mb-2 left-[90px] transform -translate-x-1/2 whitespace-nowrap font-bold text-indigo-700 text-center w-40">
                        {activeTab === 'recruiter' ? 'Recruiter Journey' : 'Job Seeker Journey'}
                    </div>
                </motion.div>

                {/* Step Nodes and Content */}
                <div className="relative w-full max-w-4xl">
                    {(activeTab === 'recruiter' ? recruiterSteps : jobSeekerSteps).map((step, index) => {
                        const isLeft = index % 2 === 0;
                        const yPosition = 120 + (index * 160);

                        return (
                            <div key={index} className="relative" style={{ height: index === 0 ? `${yPosition}px` : '160px' }}>
                                {/* Horizontal connector line */}
                                <svg
                                    className="absolute left-1/2 transform -translate-x-1/2"
                                    style={{ top: `${index === 0 ? yPosition - 20 : 140}px`, width: '100px', height: '4px' }}
                                    viewBox="0 0 100 4"
                                    preserveAspectRatio="none"
                                >
                                    <motion.path
                                        d={isLeft ? "M50,2 L0,2" : "M50,2 L100,2"}
                                        stroke="#FF6B6B"
                                        strokeWidth="4"
                                        fill="none"
                                        variants={drawLine}
                                        initial="hidden"
                                        animate="visible"
                                        custom={index}
                                    />
                                </svg>

                                {/* Node */}
                                <motion.div
                                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                                    style={{ top: `${index === 0 ? yPosition - 20 : 140}px` }}
                                    variants={nodeVariants}
                                    custom={index + 1}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {/* <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-indigo-600">
                                        <div className="text-indigo-600 font-bold text-lg">
                                            {index + 1}
                                        </div>
                                    </div> */}
                                </motion.div>

                                {/* Content */}
                                <motion.div
                                    className={`absolute top-0 w-5/12 ${isLeft ? 'left-0 pr-8 text-right' : 'right-0 pl-8 text-left'}`}
                                    style={{ top: `${index === 0 ? yPosition - 50 : 110}px` }}
                                    variants={contentVariants}
                                    custom={index + 1}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <div className={`bg-white rounded-xl p-5 shadow-lg border-2 border-indigo-200 ${isLeft ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                                        <div className="flex items-center mb-2 justify-center">
                                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                                                {step.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                                        <p className="text-sm text-gray-600">{step.description}</p>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Call to Action */}
            <motion.div
                className="text-center mt-[280px] lg:mt-[100px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="px-8 py-3 bg-[#FF6B6B] text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200">
                        {activeTab === 'recruiter' ? 'Sign Up as Recruiter' : 'Create Job Seeker Profile'}
                    </button>
                    <button className="px-8 py-3 bg-white text-black font-medium rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200">
                        Learn More
                    </button>
                </div>
            </motion.div>

        </div >
    );
}

