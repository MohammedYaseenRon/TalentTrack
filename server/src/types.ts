// src/types.ts

export interface SignupInput {
    name: string;
    email: string;
    password: string;
    role: 'RECRUITER' | 'JOB_SEEKER';
}

export interface LoginInput {
    email: string;
    password: string;
}

