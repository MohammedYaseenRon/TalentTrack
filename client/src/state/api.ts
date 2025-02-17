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
    user: {
      id: number
      name: string
      email: string
    }
    status: string
    appliedAt: string
    jobId: number
    applicationDetails: ApplicationsForm
  }
export interface Application {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
    job: {
        title: string;
    };
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
    resumeUrl: File | null,
    coverLetter: string,
    expectedSalary: string,
    noticePeriod: string,
    education: Education,
    workExperience: {
        companies: Company[]
    }
    skills: string[],
    additionalInfo: string
}

