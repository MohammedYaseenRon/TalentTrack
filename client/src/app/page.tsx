import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white w-full h-screen">
      <Navbar />
      <div className="flex justify-center items-center p-16 md:p-32">
        <div className="max-w-2xl space-y-6 text-center">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl px-6 py-3">Be ahead of everyone</Button>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">Get Hired with Your Work</h1>
          <p className="text-xl md:text-2xl font-semibold text-red-600">Join Talents Tracks and turn your projects into opportunities.</p>
          <Button className="bg-black hover:bg-gray-800 text-white font-medium rounded-full px-8 py-4">Get started</Button>
        </div>
      </div>
    </div>
  );
}
