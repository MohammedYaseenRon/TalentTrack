import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createJob = async (req:Request,res:Response):Promise<void> => {
    const {title,description,skills,location,deadline} = req.body;
    const recruiterId = req.user?.id;
    // const role = req.user?.role;
    console.log('User:', req.user);  // Log to verify if user object contains role


    if (!recruiterId) {
        console.log("Create Job - User not authenticated");
        res.status(401).json({
            error: "Access denied for this role.",
        });
        return;
    }
    try{
        const newJob = await prisma.job.create({
            data:{
                title,
                description,
                skills,
                location,
                deadline,
                recruiterId
            }
        })
        res.status(201).json(newJob)
    }catch(error:any){
        res.status(500).json({error: "An error while creating Jobs"})
    }
}

export const getJobs = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {
        const jobs = await prisma.job.findMany({
            include:{
                recruiter:true
            },
        });
        if(jobs.length ===  0) {
            res.status(404).json({message: "No jobs found"});
            return;
        }
        res.json(jobs);
    } catch (error: any) {
        res.status(500).json({ message: `Error while creating ptoject: ${error.message}` });
    }
};