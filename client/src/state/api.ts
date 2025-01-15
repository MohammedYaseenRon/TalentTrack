export interface ModalProps {
    id?: string | null;
    isOpen: boolean;
    onClose: () => void;
    name: string;
    width?:string;
    height?:string
    className?:string
  
}

export interface JobOfferProps {
    id:number;
    title: string;
    description: string;
    skills: string[];
    salary:string;
    location: string,
    deadline: string;
}

export interface Company {
    name: string,
    position: string,
    duration: string
}

export interface Education{
    degree:string,
    university:string,
    graduationYear:string
}
export interface ApplicationsForm {
    resumeUrl:string,
    coverLetter:string,
    expectedSalary:string,
    noticePeriod:string,
    education:Education,
    workExperience: {
        companies: Company[]
    }
    skills:string[],
    additionalInfo:string
}

