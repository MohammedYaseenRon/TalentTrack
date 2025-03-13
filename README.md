# TalentTrack 
Full Stack Web Application

## Project Overview  
TalentTrack is a full-stack job portal that enables recruiters to post jobs, schedule interviews, receive applications, and efficiently manage applicant details.  

The project is built using:  
- **Client:** Next.js  
- **Server:** Node.js + Express.js  
- **Database ORM:** Prisma  


## Tech Stack
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js, Prisma ORM, WebSocket (for real-time)
- Database: PostgreSQL
- Deployment: Railway (Backend), Vercel (Frontend)

## Features
- ✅ Job Postings
- ✅ Application Management
- ✅ Task Management
- ✅ Real-time Notifications using WebSocket
- ✅ Interview Scheduling
- ✅ User Authentication (JWT)



## Installation Steps
1. Clone the repository:

git clone https://github.com/username/talenttrack.git
cd talenttrack

2. Install dependencies for the client:
cd client
npm install

3. Install dependencies for the server:
cd server
npm install

4. Set up the database:
npx prisma migrate dev


## Running the Application
npm run start:dev

Alternatively, run them separately:

1. Start the server:
cd server 
npm run dev

2. Start the client:
cd client
npm run dev

Access the app at http://localhost:3000.


Production Mode

1.Build for this client:
cd client
npm run build
npm run start

1.Build for this server:
npm run build
npm run start



