# TalentTrack Full Stack Web Application

## Project Overview
TalentTrack is a full-stack job portal that enables recruiters to post jobs, schedule interviews, receive applications, and efficiently manage applicant details.

## Tech Stack
- **Client:** Next.js, React.js, Tailwind CSS, Zustand
- **Server:** Node.js, Express.js, Prisma ORM, WebSocket
- **Database:** PostgreSQL
- **Deployment:** Railway (Backend), Vercel (Frontend)

## Features
- ✅ Job Postings
- ✅ Application Management
- ✅ Task Management
- ✅ Real-time Notifications using WebSocket
- ✅ Interview Scheduling
- ✅ User Authentication (JWT)
- ✅ Image hosting in Cloudinary
- ✅ Resume Key-Details extraction through Gemini
- ✅ Resume Upload and Storage

## Environment Variables
### Client .env
```plaintext
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Server .env
```plaintext
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
PORT=4000
JWT_SECRET=<your-secret>
EMAIL_USER=<your_email>
EMAIL_PASS=<password>
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
RESUME_STORAGE_PATH=uploads/resumes
```

## Installation Steps
```bash
# Clone repository
git clone https://github.com/username/talenttrack.git
cd talenttrack

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Set up database
npx prisma migrate dev

# Create resume storage directory
mkdir -p uploads/resumes
```

## Running the Application
```bash
# Development mode (combined)
npm run start:dev

# Or run separately:
# Server
cd server
npm run dev

# Client
cd client
npm run dev
```
Access at http://localhost:3000

## Production Mode
```bash
# Build and start client
cd client
npm run build
npm run start

# Build and start server
cd server
npm run build
npm run start
```