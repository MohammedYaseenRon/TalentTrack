import ProjectsCard from '@/components/ProjectsCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';


//mock data for projects card
const mockProjects = [
  {
      projectName: "E-commerce Website",
      projectDescription: "A fully functional e-commerce website with a React frontend and Node.js backend.",
      techStack: "React, Node.js, MongoDB, Express",
      livedemo: "https://live-demo-ecommerce.com",
      sourcecode: "https://github.com/user/ecommerce-website",
      tags: ["React", "Node.js", "MongoDB", "E-commerce", "Full-Stack"],
      images: [
          new File([""], "ecommerce1.jpg", { type: "image/jpeg" }),
          new File([""], "ecommerce2.jpg", { type: "image/jpeg" })
      ]
  },
  {
      projectName: "Personal Portfolio",
      projectDescription: "A personal portfolio to showcase projects and skills with a modern, responsive design.",
      techStack: "HTML, CSS, JavaScript, React",
      livedemo: "https://live-demo-portfolio.com",
      sourcecode: "https://github.com/user/personal-portfolio",
      tags: ["React", "Frontend", "Portfolio", "JavaScript", "Responsive Design"],
      images: [
          new File([""], "portfolio1.jpg", { type: "image/jpeg" }),
          new File([""], "portfolio2.jpg", { type: "image/jpeg" })
      ]
  },
  {
      projectName: "Blog Platform",
      projectDescription: "A blog platform with features like authentication, CRUD operations, and a rich text editor.",
      techStack: "Node.js, Express, MongoDB, Passport.js",
      livedemo: "https://live-demo-blogplatform.com",
      sourcecode: "https://github.com/user/blog-platform",
      tags: ["Node.js", "Express", "MongoDB", "Backend", "Authentication"],
      images: [
          new File([""], "blog1.jpg", { type: "image/jpeg" }),
          new File([""], "blog2.jpg", { type: "image/jpeg" })
      ]
  },
  {
      projectName: "Weather App",
      projectDescription: "A weather forecasting app that uses OpenWeather API to fetch real-time weather data.",
      techStack: "React, OpenWeather API, CSS",
      livedemo: "https://live-demo-weatherapp.com",
      sourcecode: "https://github.com/user/weather-app",
      tags: ["React", "API", "Frontend", "Weather", "CSS"],
      images: [
          new File([""], "weather1.jpg", { type: "image/jpeg" }),
          new File([""], "weather2.jpg", { type: "image/jpeg" })
      ]
  }
]

export default function Projects() {



  return (  
    <div className='p-2 mx-auto'>
      <div className='grid grid-cols-4 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {mockProjects.map((project,index) => (
          <ProjectsCard key={index} {...project} />
        ))}
      </div>
    </div>
  )
}

