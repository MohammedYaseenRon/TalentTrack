import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs"
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from "pdf-parse";




const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
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
        res.status(500).json({ message: "Server error" });

    }
}

export const updateProfile = async (req: Request, res: Response): Promise<void> => {

    try {
        const userId = req.user?.id;
        const { name, email, password } = req.body;

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'Invalid email format' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updateUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        res.status(200).json({ message: "Profile update successfully", updateUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getUserProject = async (req: Request, res: Response): Promise<void> => {

    try {
        const userId = req.user?.id;

        const projects = await prisma.project.findMany({
            where: {
                userId
            },
            include: {
                tags: true,
                images: true,
                rating: true,
                comment: true,
            }
        })
        res.status(200).json({ message: "Found user project successfully", projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteProject = async (req: Request, res: Response): Promise<void> => {

    try {
        const userId = req.user?.id;
        const projectId = req.params.id;

        const project = await prisma.project.findUnique({
            where: {
                id: parseInt(projectId)
            },
        });
        if (!project || project.userId !== userId) {
            res.status(403).json({ message: "Unauthorized actions" })
        }
        await prisma.project.delete({
            where: {
                id: parseInt(projectId)
            },
        })
        res.status(200).json({ message: "Project deleted successfully", project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


const extractTextFromPdf = async (filePath: string): Promise<string> => {
    const data = await pdf(fs.readFileSync(filePath));
    return data.text;
}

export const analyzeResume = async (req: Request, res: Response): Promise<void> => {
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
            res.status(400).json("User id is required");
            return;
        }

        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }

        const filePath = req.file?.path;
        const fileName = req.file?.filename;


        if (!filePath) {
            res.status(400).json({ message: "File path is missing" });
            return;
        }

        const resumeText = await extractTextFromPdf(filePath);


        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `
        You are an expert resume analyzer. Given the extracted text from a resume, provide a detailed analysis before it is sent to a recruiter. Evaluate the resume based on key metrics, suggest improvements, and assign a score out of 100.

        ### **Key Information to Extract:**
        - **Personal Information:** Identify missing details (e.g., contact info, LinkedIn, portfolio link).
        - **Summary Analysis:** Assess if the candidate's summary effectively highlights their skills and experience.
        - **Work Experience:** Evaluate job titles, descriptions, achievements (quantifiable metrics preferred), and relevance to the desired industry.
        - **Skills & Technologies:** Identify key technical and soft skills. Suggest additional skills if required.
        - **Education & Certifications:** Check if they are relevant to the job role. Suggest improvements if necessary.
        - **Projects & Contributions:** Analyze listed projects and contributions to open-source/work. Recommend ways to improve presentation.
        - **ATS Compatibility:** Check formatting, keyword usage, and readability for applicant tracking systems (ATS).

        ### **Improvement Suggestions:**
        - Highlight weak areas (e.g., vague descriptions, missing achievements, poor formatting).
        - Recommend better structuring, additional details, or changes for a stronger impact.

        ### **Final Evaluation:**
        - Assign a **resume strength score (0-100)** based on relevance, clarity, and impact.
        - Provide a **final summary** with actionable feedback.

        ### **Resume Content:**
        Return the response in the following JSON format:
        {
          "personal_information": {
            "details": string,
            "missing": string[],
            "suggestions": string
          },
          "summary_analysis": {
            "assessment": string,
            "suggestions": string
          },
          "work_experience": {
            "evaluation": string,
            "achievements": string,
            "suggestions": string
          },
          "skills_technologies": {
            "technical_skills": string[],
            "soft_skills": string[],
            "suggestions": string
          },
          "education_certifications": {
            "details": string,
            "relevance": string,
            "suggestions": string
          },
          "projects_contributions": {
            "analysis": string,
            "suggestions": string
          },
          "ats_compatibility": {
            "formatting": string,
            "keywords": string,
            "readability": string,
            "suggestions": string
          },
          "final_evaluation": {
            "score": number,
            "summary": string
          }
        }
        ${resumeText}`;
        const result = await model.generateContent(prompt);


        if (!result || !result.response) {
            throw new Error("Gemini API did not return a valid response");
        }

        const response = await result.response;
        console.log("Gemini API Response:", response);

        const analysis = response.text();

        const saveAnalysis = await prisma.resumeAnalysis.create({
            data: {
                userId,
                fileName,
                analysis: analysis,
                analyzedAt: new Date()
            }
        });

        res.status(200).json({ message: "Resume analyzed successfully",analysis, saveAnalysis });

    } catch (error) {
        res.status(500).json({ message: "Error while analyzing resume" })
    }
}



const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Specify the directory for file uploads
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

export const upload = multer({ storage });


