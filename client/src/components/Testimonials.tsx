"use client"
import React, { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import TestimonalCard from "./TestimonalCard";

const testimonials = [
    { 
        rating: 5, 
        name: "John Doe", 
        role: "Software Engineer", 
        feedback: "Amazing platform! It really helped me improve my coding skills and connect with top recruiters. The UI is smooth, and the resources available are top-notch. Highly recommend it to anyone looking for career growth!"
    },
    { 
        rating: 4, 
        name: "Jane Smith", 
        role: "Product Designer", 
        feedback: "Super user-friendly! The design tools and templates provided are incredibly helpful. I love the collaborative features, but I feel like there could be more customization options for advanced users."
    },
    { 
        rating: 5, 
        name: "Michael Lee", 
        role: "Full Stack Developer", 
        feedback: "Helped me land my dream job! The interview prep resources, coding challenges, and project-building guides were invaluable. The networking opportunities on the platform are also fantastic. Couldn't have asked for a better experience!"
    },
    { 
        rating: 4, 
        name: "Emma Brown", 
        role: "Data Scientist", 
        feedback: "Great experience overall! The data visualization tools and AI-powered recommendations are impressive. I found the courses to be well-structured, though I wish there were more real-world case studies included."
    },
    { 
        rating: 3, 
        name: "James Wilson", 
        role: "DevOps Engineer", 
        feedback: "Smooth and seamless workflow! The automation features saved me so much time, and the integrations with other tools are great. However, the documentation could be improved, and I experienced occasional slowdowns."
    }
];


export default function Testimonials(){
    const [activeIndex, setActiveIndex] = useState(1);

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="bg-white h-auto relative flex flex-col items-center py-16 px-6">
            <h2 className="text-4xl font-medium text-[#1E1E1E] mb-16">What Our Users Say!</h2>

            <div className="relative flex items-center justify-center w-full max-w-6xl">
                {/* Testimonial Cards */}
                <div className="relative flex w-full h-72 items-center justify-center">
                    {testimonials.map((testimonial, index) => {
                        const position = index - activeIndex;

                        return (
                            <div
                                key={index}
                                className={`absolute transition-all duration-500 ease-in-out
                                    ${position === 0
                                        ? "scale-110 z-10 opacity-100" // Center card
                                        : Math.abs(position) === 1
                                            ? "scale-90 opacity-50 blur-sm z-5" // Side cards
                                            : "hidden" // Hide other cards
                                    }
                                `}
                                style={{
                                    transform: `translateX(${position * 200}px) rotate(${position * 5}deg)`,
                                }}
                            >
                                <TestimonalCard {...testimonial} isActive={position === 0} />
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Arrows */}
                <button suppressHydrationWarning
                    className="absolute left-0 md:left-1/4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-400 p-3 rounded-full text-gray-800"
                    onClick={prevTestimonial}
                >
                    <ArrowBigLeft size={20} />
                </button>

                <button suppressHydrationWarning
                    className="absolute right-0 md:right-1/4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-400 p-3 rounded-full text-gray-800"
                    onClick={nextTestimonial}
                >
                    <ArrowBigRight size={20} />
                </button>
            </div>
        </div>
    );
}

