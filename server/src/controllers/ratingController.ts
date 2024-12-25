import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createRating = async (req: Request, res: Response): Promise<void> => {
    const { rating, projectId, userId } = req.body;

    try {
        const existingRating = await prisma.rating.findFirst({
            where: {
                userId: parseInt(userId),
                projectId: parseInt(projectId)
              },
        });
        if (existingRating) {
            res.status(400).json({ error: "User already rated this project" });
            return
        }

        const newRating = await prisma.rating.create({
            data: {
                rating: parseInt(rating),
                userId:parseInt(userId),
                projectId:parseInt(projectId)
            }
        })
        res.status(201).json(newRating);

    } catch (error) {
        res.status(500).json({ error: "Failed to create rating" })
    }
}


export const updateRating = async (req: Request, res: Response): Promise<void> => {
    const { ratingId } = req.params;
    const { rating } = req.body;

    try {
        const updateRating = await prisma.rating.update({
            where: {
                id: parseInt(ratingId)
            },
            data: {
                rating:parseInt(rating)
            },
        });
        res.status(200).json(updateRating);

    } catch (error) {
        res.status(500).json({ error: "Failed to update rating" })
    }
}

export const getRatingByProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;

    try {
        const ratings = await prisma.rating.findMany({
            where: {
                projectId: parseInt(projectId)
            },
            include: {
                user: true
            },
        });
        res.status(200).json(ratings);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch rating" })
    }
}
