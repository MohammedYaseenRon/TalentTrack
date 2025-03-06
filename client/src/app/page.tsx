"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedGradientText from "@/components/GradientText";
import Working from "@/components/Working";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Testimonals from "@/components/Testimonals";

interface MotionButtonProps {
  href: string;
  text: string;
  bgColor: string;
}

const MotionButton = ({ href, text, bgColor }:MotionButtonProps) => (
  <Link href={href}>
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`px-6 py-3 ${bgColor} border border-white text-white font-bold rounded-lg shadow-lg focus:outline-none`}
    >
      {text}
    </motion.button>
  </Link>
);

export default function Home() {
  return (
    <div className="bg-[#F8F1F1] flex flex-col">
      <Navbar />
      <div className="flex flex-col min-h-screen justify-center items-center flex-grow px-6 md:px-12">
        <div className="max-w-2xl space-y-6 text-center">
          <AnimatedGradientText text="Showcase Your Talents, Land Your Dream Job" className="mb-6 italic" fontSize="70px" />
          <p className="text-3xl md:text-2xl italic font-extrabold text-red-800">Get Hired with Your Work</p>
          <div className="flex justify-center items-center gap-8">
            <MotionButton href="/auth/signup" text="Get Started" bgColor="bg-[#FF6B6B]" />
            <MotionButton href="#" text="Learn More" bgColor="bg-black" />
          </div>
        </div>
      </div>
      <Features />
      <Working />
      {/* <Information /> */}
      <Testimonals />
      <Footer />
    </div>
  );
}
