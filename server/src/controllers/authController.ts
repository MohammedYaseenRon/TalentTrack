import { Request,Response } from "express";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignupInput,LoginInput } from "../types";


const prisma = new PrismaClient();

export const signup = async(req:Request, res:Response): Promise<void> => {
    try {
        const {name, email, password, role}:SignupInput = req.body;

        if (role !== "JOB_SEEKER" && role !== "RECRUITER") {
            res.status(400).json({ error: "Invalid role" });
            return;
        }

        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        });
        if (existingUser) {
            res.status(400).json({error: "User already exists"});
            return
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            }
        })
        const token = jwt.sign(
            { userId: user.id, role:user.role },
            process.env.JWT_SECRET!,
            {expiresIn : '24h'}
        )

        res.status(201).json({
            message:"user created successfully",
            token,
            user: {id:user.id, name:user.name, email: user.email, role:user.role}
        });
    }catch(error){
        console.error("Signup error", error);
        res.status(500).json({error: "Server error during signup"});
    }

}

export const login = async (req:Request, res:Response): Promise<void> => {
    try {
        const {email,password}: LoginInput = req.body;

        const user = await prisma.user.findUnique({where: {email}});
        if(!user){
            console.log('No user found with email:', email);
            res.status(400).json({error: "Invalid credentials"});
            return;
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        console.log('Password validation result:', validatePassword);
        if(!validatePassword){
            res.status(401).json({error: "Invalid credentials"});
            return;
        }

        const token = jwt.sign(
        { userId: user.id, role: user.role }, 
        process.env.JWT_SECRET!, 
        { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {id:user.id, name:user.name, email:user.email, role:user.role}
        })

    } catch(error) {
        console.error('Login error', error);
        res.status(500).json({error:"Server error during login"});
    }
}


