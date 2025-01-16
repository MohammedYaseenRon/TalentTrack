import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Status } from "@prisma/client";
import exp from "constants";


const prisma = new PrismaClient();

export const createApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const { jobId, userId, coverLetter, expectedSalary, resumeUrl, noticePeriod, education, workExperience, skills, additionalInfo } = req.body;
        console.log("Received req.body:", req.body);

        if (!jobId || !userId || !coverLetter || !expectedSalary || !resumeUrl || !noticePeriod || !education || !workExperience || !skills || !additionalInfo) {
            console.log("Field required field first");
            res.status(400).json({ message: "Please provide all required fields" });
            return;
        }

        const {application,notification } = await prisma.$transaction(async (prisma) => {
            const application = await prisma.application.create({
                data: {
                    jobId,
                    userId,
                    status: Status.PENDING,
                    coverLetter,
                    expectedSalary,
                    resumeUrl,
                    noticePeriod,
                    applicationDetails: {
                        create: {
                            education,
                            workExperience,
                            skills,
                            additionalInfo
                        }
                    }
                },
                include: {
                    applicationDetails: true,
                    job: true
                }
            })
            const notification = await prisma.notification.create({
                data: {
                    message: `New application received for job: ${application.job.title}`,
                    userId: application.job.recruiterId

                }
            });
            return {notification,application};
        })
        res.status(201).json({message:"Application successfully created",
            application,
            notification
        });
    } catch (error) {
        console.error("Error while creating application", error);
    }
}

export const getAllApplication = async (req:Request, res:Response):Promise<void> => {
    try{

        const {jobId} = req.params;
        const applications = await prisma.application.findMany({
            where:{
                jobId:parseInt(jobId)
            },
            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                        email:true
                    }
                },
                applicationDetails:true
            }
        })
        res.status(200).json(applications)

    }catch(error){
        console.error("Error while fetching all applications",error);
        res.status(500).json({message:"Server error while fetching applications"});
    }
}

export const getUserApplication = async (req:Request, res:Response):Promise<void> => {
    try{
        const {userId} = req.params;
        const applications =  await prisma.application.findMany({
            where:{
                userId: parseInt(userId)
            },
            include:{
                job:true,
                applicationDetails:true
            },
        })
        res.status(200).json(applications);
    }catch(error) {
        console.error("Error while getting specific application", error);
        res.status(500).json("Server error while getting specific application");
    }
}

export const updateApplicationStatus = async (req:Request, res:Response):Promise<void> => {
    try{
        const {id} = req.params;
        const { status } =  req.body;
        
        if (!['SHORTLISTED', 'REJECTED', 'ACCEPTED', 'PENDING','REVIEWING','INTERVIEWED','WITHDRAWN','OFFERED'].includes(status)) {
            res.status(400).json({ message: "Invalid status" });
            return;
        }
        const application = await prisma.application.update({
            where:{
                id:parseInt(id)
            },
            data:{
                status
            },
            include:{
                user:true,
                job:true
            }
        })
        const notification = await prisma.notification.create({
            data:{
                message: `Your application for: ${application.job.title} has been ${status.toLowerCase()}`,
                userId: application.userId

            }
        })
        res.status(200).json({message: "Successfully updated application",application,notification})
    }catch(error){
        console.error("Error while updating application");
        res.status(500).json("Server error while updating application");
    }
}

export const getShortListedCandidates = async (req:Request, res:Response):Promise<void> => {
    try{
        const {jobId} = req.params;        
        
        const shortListedCndidates = await prisma.application.findMany({
            where:{
                jobId: parseInt(jobId),
                status: Status.SHORTLISTED
            },
            include:{
               user:{
                select:{
                    id:true,
                    name:true,
                    email:true
                },
               },
               applicationDetails:true,
            },
        });
        res.status(200).json({message: "Successfully got shortlisted candidates",shortListedCndidates});
    }catch(error){
        console.error("Error while fetching shortListed Candidates", error);
        res.status(500).json("Server error while fetching shortListed Candidates");
    }
}