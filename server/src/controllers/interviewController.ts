import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import nodemailer from 'nodemailer';


const prisma = new PrismaClient();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

const generateJitsiMeetingUrl = (interviewType: string, applicationId: string): string => {
    const timestamp = Date.now();
    const roomName = `${interviewType}-${applicationId}-${timestamp}`;
    return `https://meet.jit.si/${roomName}`;
}


export const scheduleInterview = async (req: Request, res: Response): Promise<void> => {
    const { applicationId, interviewType, slotId, interviewerName } = req.body;
    try {

        const application = await prisma.application.findUnique({
            where: {
                id: applicationId
            },
            include: {
                user: true
            }
        });
        if (!application || !application.user?.email) {
            res.status(404).json({ error: "Job Seeker not found" });
            return;
        }
        const jobSeekerEmail = application.user.email;
        const jitsiMeetingUrl = generateJitsiMeetingUrl(interviewType, applicationId);


        // const slot = await prisma.interviewSlot.findUnique({
        //     where: {
        //         id: slotId
        //     }    
        // });
        // if (!slot || slot.isBooked) {
        //     res.status(400).json({ error: "Slot is unavailable" });
        //     return;
        // }


        const interview = await prisma.interview.create({
            data: {
                applicationId,
                interviewerName,
                interviewType,
                scheduledAt: new Date(),
                slot: {
                    connect: {
                        id: slotId
                    }
                },
            },
        })
        await prisma.interviewSlot.update({
            where: { id: slotId },
            data: {
                isBooked: true
            }
        });

        const mailOption = {
            from: process.env.EMAIL_USER,
            to: jobSeekerEmail,
            subject: `Interview Scheduled - ${interviewType}`,
            html: `
            <h2>Your Interview has been Scheduled</h2>
            <p>Dear Candidate,</p>
            <p>Your <strong>${interviewType}</strong> interview has been scheduled.</p>
            <p><strong>Interviewer:</strong> ${interviewerName}</p>
            <p><strong>Meeting Link:</strong> <a href="${jitsiMeetingUrl}">${jitsiMeetingUrl}</a></p>
            <p>Best of luck!</p>`,
        };
        
        await transporter.sendMail(mailOption);
        console.log({message:'Email sent successfully to:',jobSeekerEmail});


        res.status(201).json({ message: "Successfully scheduled an interview", interview });
    } catch (error: any) {
        console.error("Server error while scheduling an interview", error);
        res.status(500).json({ error: "error while scheduling an interview", details: error.message })

    }
}

export const createSlot = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const recruiterId = req.user.id
    const { startTime, endTime } = req.body;
    try {
        const slot = await prisma.interviewSlot.create({
            data: {
                startTime, endTime, recruiterId
            }
        })
        res.status(201).json(slot);
    } catch (error) {
        res.status(500).json("Server error while creating slot")
        console.error(error);
    }
}
export const getSlot = async (req: Request, res: Response): Promise<void> => {
    try {
        const slots = await prisma.interviewSlot.findMany({
            where: {
                isBooked: false
            },
            include: {
                recruiter: true
            }
        })
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: "Error fetching slots" })
        console.error(error);
    }
}

