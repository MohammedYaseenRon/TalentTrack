import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProject = async (
    req: any,
    res: Response
): Promise<void> => {
    const { name, description, techStack, livedemo, sourcecode, tags, images } = req.body;

    const { id:userId } = req.user;
    const normalizedTags = Array.isArray(tags) ? tags : [tags];
    const normalizedTechStack = Array.isArray(techStack) ? techStack : (typeof techStack === 'string' ? techStack.split(',').map((item: string) => item.trim()) : []);
    
    const validatedImages = images.map((img: any) => {
        if (img.data && img.data.startsWith('data:image')) {
            const base64Data = img.data.split(',')[1]; // Get the base64 string without prefix
            return {
                url: img.url || null,
                type: img.type,
                data: Buffer.from(base64Data, 'base64'),
            };
        } else {
            throw new Error('Invalid image data format');
        }
    });
    console.log(normalizedTags);

    try {
        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                techStack: normalizedTechStack,
                livedemo,
                sourcecode,
                tags: {
                    connectOrCreate: normalizedTags.map((object: any) => ({
                        where: { name: object.name },
                        create: { name: object.name }
                    }))
                },
                images:{create:validatedImages},
                userId,
            },
        });

        res.status(201).json(newProject);

    } catch (error: any) {
        res.status(500).json({ message: `Error while creating project: ${error.message}` });
    }
};


export const getProjects = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {
        const projects = await prisma.project.findMany({
            include:{
                tags:true,
                images:true
            }
        })
        res.json(projects);
    } catch (error: any) {
        res.status(500).json({ message: `Error while creating ptoject: ${error.message}` });
    }
};
export const getProjectById = async (
    req: Request,
    res: Response
): Promise<void> => {

    const { id } = req.params;

    try {
        const project = await prisma.project.findUnique({
            where: {
                id: Number(id)
            },
        });

        if (!project) {
            res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (error: any) {
        res.status(500).json({ message: `Error while finding project: ${error.message}` });
    }
};





