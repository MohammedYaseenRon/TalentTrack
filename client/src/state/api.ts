export interface ModalProps {
    id?: string | null;
    isOpen: boolean;
    onClose: () => void;
    name: string;
    width?: string;
    height?: string
    className?: string


}
export interface ApplicationProps {
    id: number
    user?: {
        id: number
        name: string
        email: string
    }
    status?: string
    appliedAt?: string
    jobId?: number
    resumeUrl: string | null,
    coverLetter: string,
    expectedSalary: string,
    noticePeriod: string,

    applicationDetails?: {
        id: number
        applicationId: number
        education?: Education,
        workExperience?: {
            companies: Company[]
        }
        skills?: string[],
        additionalInfo?: string
    }

}

interface ApplicationData {
    id: number;
    user: {
        name: string;
        email: string;
    };
    jobId: number; // Added jobId here
}



export interface InterviewSchedulerProps {
    jobId: number; // This is passed from the parent component (the specific job being viewed)
    applications: ApplicationData[]; // Accept applications as a prop
}

export interface JobOfferProps {
    id: number;
    title: string;
    description: string;
    skills: string[];
    salary: string;
    location: string,
    deadline: string;
}
export interface Submission {
    id: number;
    taskId: number;
    jobSeekerId: number;
    submissonUrl: string;
    status: string;
    submittedAt: string;
    task: {
        id: number;
        title: string;
    };
    jobSeeker: {
        id: number;
        name: string;
        email: string;
    };
}

export interface TaskSubmissionProps {
    id: number;
    submissionUrl: string
}
export interface Company {
    name: string,
    position: string,
    duration: string
}

export interface Education {
    degree: string,
    university: string,
    graduationYear: string
}
export interface ApplicationsForm {
    education: Education,
    workExperience: {
        companies: Company[]
    }
    skills: string[],
    additionalInfo: string
}
export interface AnalysisResponse {
    message: string;
    fileName: string;
    analysis: string; // The actual analysis text
    saveAnalysis: boolean;
}

export interface ResumeAnalysis {
    personal_information: {
        details: string;
        missing: string[];
        suggestions: string;
    },
    summary_analysis: {
        assessment: string,
        suggestions: string
    },
    work_experience: {
        evaluation: string,
        achievements: string,
        suggestions: string
    },
    skills_technologies: {
        technical_skills: string[],
        soft_skills: string[],
        suggestions: string,

    },
    education_certifications: {
        details: string,
        relevance: string,
        suggestions: string
    },
    projects_contributions: {
        analysis: string,
        suggestions: string
    },
    ats_compatibility: {
        formatting: string,
        keywords: string,
        readability: string,
        suggestions: string
    },
    final_evaluation: {
        score: number,
        summary: string
    }
}

export interface Profile {
    id: number;
    name: string;
    email: string;
}

export interface ProfileProject {
    id: number;
    name: string;
    createdAt: string;
}


interface User {
    name: string;
    email: string;
}

interface JobApplication {
    id: number;
    user: User;
}


export interface TaskData {
    id: number
    title: string;
    description: string,
    deadline: Date;
    taskImage: { url: string; type: string }[]

}
export interface TaskSubmissionProps {
    submissionUrl: string
}


export interface Task {
    title: string;
    description: string,
    deadline: Date;
    taskImage: File[]

}

export interface WebSocketMessage {
    type: "NEW_APPLICATION";
    data: JobApplication;
}


