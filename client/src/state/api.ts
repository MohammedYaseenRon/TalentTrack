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
    title: string;
    description: string;
    skills: string[];
    salary:string;
    location: string,
    deadline: string;
}