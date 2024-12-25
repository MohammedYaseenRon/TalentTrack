import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Working from "@/components/Working";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white w-full h-screen">
      <Navbar />
      <div className="flex justify-center items-center p-16 md:p-32">
        <div className="max-w-2xl space-y-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">Showcase Your Talents, Land your Dream Job</h1>
          <p className="text-2xl md:text-3xl font-semiboldtext-gray-500 md:text-xl dark:text-gray-400">Get Hired with Your Work</p>
          <div className="flex justify-center items-center gap-4">
            <Link href="/auth/login"><Button className="bg-black text-sm text-black text-white px-8 py-4">Get started</Button></Link>
            <Button variant="outline" className="px-8 py-4 text-sm">Learn More</Button>
          </div>
        </div>
      </div>
      <Working />
    </div>
  );
}
