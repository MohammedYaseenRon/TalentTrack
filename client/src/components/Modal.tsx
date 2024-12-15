import { X } from 'lucide-react';
import React from 'react'

interface ModalProps {
    children:React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    name:string;

}

const Modal = ({children,name,isOpen,onClose}:ModalProps) => {
    if(!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex flex justify-center items-center overflow-y-auto bg-gray-300 bg-opacity-50 p-4'>
        <div className='w-full max:w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary'>
            <div className='flex items-center justify-center border-b pb-2 mb-4'>
                {name && <h2 className='text-black font-medium text-xl'>{name}</h2>}
                <button onClick={onClose} className='flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600'>
                    <X size={18} /> 
                </button>
            </div>
            <div>
                {children}
            </div>
        </div>

    </div>
  )
}

export default Modal