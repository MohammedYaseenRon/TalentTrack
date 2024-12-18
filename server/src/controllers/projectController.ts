import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProject = async (
    req:any,
    res:Response
): Promise<void> => {
    const { name,description,techStack,livedemo,sourcecode,tags,images} = req.body;

    const { userId } = req.user;    

    try{
        const newProject = await prisma.project.create({
            data:{
                name,
                description,
                techStack,
                livedemo,
                sourcecode,
                tags,
                images,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId,
            },
        });

        res.status(201).json(newProject);

    }catch(error:any){
        res.status(500).json({message: `Error while creating project: ${error.message}`}); 
    }
};


export const getProjects = async (
    req:Request,
    res:Response
): Promise<void> => {
    
    try{
        const projects = await prisma.project.findMany();
        res.json(projects);
    }catch(error:any){
        res.status(500).json({message: `Error while creating ptoject: ${error.message}`}); 
    }
};
export const getProjectById = async (
    req:Request,
    res:Response
): Promise<void> => {

    const {id} = req.params;
    
    try{
        const project = await prisma.project.findUnique({
            where:{
                id: Number(id)
            },
        });

        if(!project){
            res.status(404).json({message: "Project not found"})    ;
        }

        res.json(project);
    }catch(error:any){
        res.status(500).json({message: `Error while finding project: ${error.message}`}); 
    }
};





