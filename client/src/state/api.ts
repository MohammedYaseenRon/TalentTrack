export interface ModalProps {
    id?: string | null;
    isOpen: boolean;
    onClose: () => void;
    name: string;
    width?:string;
  
}