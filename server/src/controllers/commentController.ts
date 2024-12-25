import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma  =  new PrismaClient();


export const createComment  = async (req:Request, res:Response): Promise<void> => {
    const { text, userId, projectId } = req.body;

    try{
        const comment = await prisma.comment.create({
            data:{
                text,
                userId,
                projectId
            },
        });
        res.status(201).json(comment);
    }catch(error) {
        res.status(500).json({error: "Failed to create comment"});
    }
}


export const updateComment = async (req:Request,res:Response): Promise<void> => {
    const { commentId } = req.params;
    const { text } = req.body;

    try{
        const comment = await prisma.comment.update({
            where:{
                id:parseInt(commentId),
            },
            data:{ 
                text
            },

        });
        res.status(200).json(comment);
    }catch(error) {
        res.status(500).json({error: "Failed to update comment"})
    }
}


export const getCommentsByProject = async (req:Request,res:Response): Promise<void> => {
    const { projectId } = req.params;
    try{
        const comments  = await prisma.comment.findMany({
            where: {
                projectId:parseInt(projectId)
            },
            include: {
                user: true,      // optionally include a user who made the comment
            },
            
        });
        res.status(200).json(comments)   
        
    }catch(error) {
        res.status(500).json({error: "Failed to fetch comments"})
    }
            
}