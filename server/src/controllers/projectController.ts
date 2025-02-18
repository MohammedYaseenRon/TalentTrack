import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../../config/cloudinary";
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"

const prisma = new PrismaClient();

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        resource_type: "auto",
        format: file.mimetype.split("/")[1], // Extract format dynamically
        public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
        folder: "projects", // ✅ Folder now correctly inside the params function
    }),
});


export const upload = multer({ storage: storage })


export const createProject = async (
    req: any,
    res: Response
): Promise<void> => {
    const { name, description, techStack, livedemo, sourcecode, tags, images } = req.body;

    const { id: userId } = req.user;
    const normalizedTags = typeof tags === "string"
        ? tags.split(',').map((tag: string) => ({ name: tag.trim() }))
        : Array.isArray(tags) ? tags.map((tag: any) => (typeof tag === "string" ? { name: tag.trim() } : tag)) : [];

    console.log("Normalized Tags:", normalizedTags);

    console.log(normalizedTags);
    const normalizedTechStack = Array.isArray(techStack) ? techStack : (typeof techStack === 'string' ? techStack.split(',').map((item: string) => item.trim()) : []);
    const files = req.files as Express.Multer.File[]; // Fix: Use req.files

    console.log(normalizedTags);

    try {
        const uploadImages = files.map((file) => ({
            url: file.path,
            type: file.mimetype,
        }));



        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                techStack: normalizedTechStack,
                livedemo,
                sourcecode,
                tags: {
                    connectOrCreate: normalizedTags.map((tag: any) => ({
                        where: { name: tag.name },
                        create: { name: tag.name }
                    }))
                },
                images: { create: uploadImages }, // Now correctly structured
                userId,
            },
        });
        console.log(newProject);

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
            include: {
                tags: true,
                images: true
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
            include:{
                images:true
            }
        });

        if (!project) {
            res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (error: any) {
        res.status(500).json({ message: `Error while finding project: ${error.message}` });
    }
};





