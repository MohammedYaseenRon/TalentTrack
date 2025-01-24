import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const scheduleInterview = async (req: Request, res: Response): Promise<void> => {
    const {applicationId,interviewType,slotId,interviewerName} = req.body;
    try {           
        const interview = await prisma.interview.create({
            data:{
                applicationId,
                interviewerName,
                interviewType,
                scheduledAt:new Date(),
                slot:{
                    connect: {
                        id:slotId
                    }
                },
            },
        })
        await prisma.interviewSlot.update({
            where:{id:slotId},
            data:{
                isBooked:true
            }
        })
        res.status(201).json({message:"Successfully scheduled an interview", interview});
    } catch (error) {
        res.status(500).json({error:"error while scheduling an interview"})
        console.error("Server error while scheduling an interview")
    }
}

export const createSlot = async (req:Request, res:Response): Promise<void> => {
    const {startTime,endTime,recruiterId} = req.body;
    try{
        const slot = await prisma.interviewSlot.create({
            data:{
                startTime,endTime,recruiterId
            }
        })
        res.status(201).json(slot);
    }catch(error){
        res.status(500).json("Server error while creating slot")
        console.error(error);
    }
}
export const getSlot = async (req:Request, res:Response): Promise<void> => {
    try{
        const slots = await prisma.interviewSlot.findMany({
            where:{
                isBooked:true,
            },
            include:{
                recruiter:true
            }
        })
        res.status(201).json(slots);
    }catch(error){
        res.status(500).json({error:"Error fetching slots"})
        console.error(error);
    }
}

