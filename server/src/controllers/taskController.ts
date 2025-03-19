import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const createTask = async (req: any, res: Response): Promise<void> => {

    try {
        const { title, description, deadline } = req.body;
        const recruiterId = req.user?.id;
        const files = req.files as Express.Multer.File[]; // Fix: Use req.files

        if (!title || !description  || !deadline || !files) {
            res.status(404).json("Error these fields are required");
            return;
        }

        const uploadImages = files.map((file) => ({
                url: file.path,
                type: file.mimetype,

        }));
        const taskCreate = await prisma.task.create({
            data: {
                title,
                description,
                deadline: new Date(deadline),
                taskImage: { create: uploadImages },
                recruiterId
            }
        })
        res.status(201).json({ message: "Successfully created task", taskCreate });
    } catch (error) {
        res.status(500).json('Server error while creating task');
    }
}

export const getTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await prisma.task.findMany({
            include: { taskImage: true }
        })
        console.log(tasks);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    const taskId = req.params;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                id: taskId
            },
            include: { taskImage: true }
        })
        if (!tasks) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
export const taskSubmission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { submissonUrl } = req.body;
        const taskId = Number(req.params.taskId); 
        const jobSeekerId = req.user?.id
        console.log("✅ Task Submission Request:", { taskId, jobSeekerId, submissonUrl });
        console.log("🔍 Authenticated User:", req.user); // Check if user exists


        if (!jobSeekerId) {
            res.status(401).json({ message: "Unauthorized: User not found" });
            return;
        }

        if (!submissonUrl || !taskId) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const taskSubmissions = await prisma.taskSubmisson.create({
            data: {
                submissonUrl,
                taskId,
                jobSeekerId: Number(jobSeekerId),
                status: "submitted"

            }
        })
        res.status(201).json({ message: "Submission made successfully", taskSubmissions });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const getTaskSubmission = async (req: Request, res: Response): Promise<void> => {
    try{
        const taskId = Number(req.params.taskId);
        const submissions = await prisma.taskSubmisson.findMany({
            where:{
            taskId:taskId
            },
            include:{
                task:true,
                jobSeeker:true
            }
        })
        res.status(200).json(submissions);
    }catch(error) {
        res.status(500).json({message:'Server error'});
    }
}