import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";



const prisma = new PrismaClient();

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                project: true,
                rating: true,
                comment: true,
                notification: true
            }
        })
        if (!user) {
            res.status(400).json({ message: "Error finding specific user details" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("error");
       res.status(500).json({message:"Server error"});

    }
}

export const updateProfile = async (req:Request,res:Response): Promise<void> => {

    try{
        const userId = req.user?.id;
        const {name,email,password} = req.body;

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'Invalid email format' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password,10);
    
        const updateUser = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                name,
                email,
                password:hashedPassword
            }
        })
        res.status(200).json({message:"Profile update successfully", updateUser});
    }catch(error){
        console.error(error);   
        res.status(500).json({message:"Server error"});
    }
}

export const getUserProject = async (req:Request,res:Response):Promise<void> => {

    try{
        const userId = req.user?.id;
    
        const projects = await prisma.project.findMany({
            where:{
                userId
            },
            include:{
                tags: true, 
                images: true, 
                rating: true,
                comment: true,
            }
        })
        res.status(200).json({message:"Found user project successfully", projects});
    }catch(error){
        console.error(error);   
        res.status(500).json({message:"Server error"});
    }
}

export const deleteProject = async (req:Request,res:Response):Promise<void> => {

    try{
        const userId = req.user?.id;
        const projectId = req.params.id;
    
        const project = await prisma.project.findUnique({
            where:{
                id: parseInt(projectId)
            },
        });
        if(!project || project.userId !== userId){
             res.status(403).json({message:"Unauthorized actions"})
        }
        await prisma.project.delete({
            where:{
                id:parseInt(projectId)
            },
        })
        res.status(200).json({message:"Project deleted successfully", project});
    }catch(error){
        console.error(error);   
        res.status(500).json({message:"Server error"});
    }
}


