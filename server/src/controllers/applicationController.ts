import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Status } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs"
import { WebSocketServer, WebSocket } from "ws";
import  {wss} from '../index'
import { upload } from "./userController";


const prisma = new PrismaClient();

export const createApplication = async (req: Request, res: Response): Promise<void> => {

    try {

        await new Promise<void>((resolve, reject) => {
            upload.single("resume")(req, res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        const userId = req.user?.id;
        if (!userId) {
            res.status(400).json({ message: "Unauthoreized: No user Id found in request" });
            return;
        }

        const { jobId, coverLetter, expectedSalary, noticePeriod, education, workExperience, skills, additionalInfo } = req.body;
        console.log("Received req.body:", req.body);

        if (!jobId || !userId || !coverLetter || !expectedSalary || !noticePeriod || !education || !workExperience || !skills || !additionalInfo) {
            console.log("Field required field first");
            res.status(400).json({ message: "Please provide all required fields" });
            return;
        }
        if (!req.file) {
            res.status(400).json({ message: "Resume file is requires" });
            return

        }
        console.log("Uploaded file details:", req.file);

        const resumeUrl = `/uploads/${req.file.filename}`; // Uploaded file path

        const { application, notification } = await prisma.$transaction(async (prisma) => {
            const application = await prisma.application.create({
                data: {
                    jobId: parseInt(jobId),
                    userId,
                    status: Status.PENDING,
                    coverLetter,
                    expectedSalary,
                    resumeUrl,
                    noticePeriod,
                    applicationDetails: {
                        create: {
                            education: JSON.parse(education),
                            workExperience: JSON.parse(workExperience),
                            skills: JSON.parse(skills),
                            additionalInfo
                        }
                    }
                },
                include: {
                    applicationDetails: true,
                    job: true
                }
            })
            const notification = await prisma.notification.create({
                data: {
                    message: `New application received for job: ${application.job.title}`,
                    userId: application.job.recruiterId

                }
            });
            return { notification, application };
        });

        //ws part
        wss.clients.forEach((client: WebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: "NEW_APPLICATION", // Match frontend expectation
                    data: application,
                }));
            }
        });

        res.status(201).json({
            message: "Application successfully created",
            application,
            notification
        });
    } catch (error: any) {
        console.error("Error while creating application", error);
    }
}

export const getAllApplication = async (req: Request, res: Response): Promise<void> => {
    try {

        const { jobId } = req.params;
        console.log("Received jobId:", jobId); // Add this log

        const parsedJobId = Number(jobId);
        if (!parsedJobId || isNaN(parsedJobId)) {
            res.status(400).json({ message: "Invalid jobId" });
        }
        const applications = await prisma.application.findMany({
            where: {
                jobId: parsedJobId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                applicationDetails: true
            }
        })
        res.status(200).json(applications)

    } catch (error) {
        console.error("Error while fetching all applications", error);
        res.status(500).json({ message: "Server error while fetching applications" });
    }
}
// export const getApplicationDetails = async (req: Request, res: Response): Promise<void> => {
//     try {

//         const { applicationId } = req.params;
//         console.log("Received application:", applicationId); // Add this log

//         const parseapplicationId = Number(applicationId);
//         if (!applicationId || isNaN(parseapplicationId)) {
//             res.status(400).json({ message: "Invalid application Id" });
//         }
//         const applications = await prisma.application.findMany({
//             where:{
//                 id:parseapplicationId
//             },
//             include:{
//                 user:{
//                     select:{
//                         id:true,
//                         name:true,
//                         email:true
//                     }
//                 },
//                 job:{
//                     select:{
//                         id:true,
//                         title:true,
//                         recruiterId:true
//                     }
//                 },
//                 applicationDetails:true
//             }

//         })
//         if (!applications) {
//             res.status(404).json({ message: "Application not found" });
//         }
//         res.status(200).json(applications)

//     } catch (error) {
//         console.error("Error while fetching all applications", error);
//         res.status(500).json({ message: "Server error while fetching applications" });
//     }
// }

export const getUserApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const applications = await prisma.application.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                job: true,
                applicationDetails: true
            },
        })
        res.status(200).json(applications);
    } catch (error) {
        console.error("Error while getting specific application", error);
        res.status(500).json("Server error while getting specific application");
    }
}

export const updateApplicationStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['SHORTLISTED', 'REJECTED', 'ACCEPTED', 'PENDING', 'REVIEWING', 'INTERVIEWED', 'WITHDRAWN', 'OFFERED'].includes(status)) {
            res.status(400).json({ message: "Invalid status" });
            return;
        }
        const application = await prisma.application.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status
            },
            include: {
                user: true,
                job: true
            }
        })
        const notification = await prisma.notification.create({
            data: {
                message: `Your application for: ${application.job.title} has been ${status.toLowerCase()}`,
                userId: application.userId

            }
        })
        res.status(200).json({ message: "Successfully updated application", application, notification })
    } catch (error) {
        console.error("Error while updating application");
        res.status(500).json("Server error while updating application");
    }
}

export const getShortListedCandidates = async (req: Request, res: Response): Promise<void> => {
    try {
        const { jobId } = req.params;

        const shortListedCndidates = await prisma.application.findMany({
            where: {
                jobId: parseInt(jobId),
                status: Status.SHORTLISTED
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    },
                },
                applicationDetails: true,
            },
        });
        res.status(200).json({ message: "Successfully got shortlisted candidates", shortListedCndidates });
    } catch (error) {
        console.error("Error while fetching shortListed Candidates", error);
        res.status(500).json("Server error while fetching shortListed Candidates");
    }
}

export const deleteApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleteApplication = await prisma.application.delete({
            where: {
                id: parseInt(id),
            },
            include: {
                job: true,
                applicationDetails: true
            },
        })
        res.status(200).json(deleteApplication);
    } catch (error) {
        console.error("Error while deleting application", error);
        res.status(500).json("Server error while while deleting application");
    }
}

// const uploadDir = path.join(__dirname, '..', '..', 'uploads');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Specify the directory for file uploads
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
//     },
// });

// const upload = multer({ storage });


