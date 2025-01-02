import React from 'react'
import Modal from './Modal'
import { ModalProps } from '@/state/api';
import { LogOut, User2, FolderKanban, Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Profilepage: React.FC<ModalProps> = ({ isOpen, onClose, width, className,height }) => {
    const router = useRouter();
    const projects = [
        { id: 1, name: "Project Alpha", date: "2024-01-15" },
        { id: 2, name: "Project Beta", date: "2024-01-10" },
        { id: 3, name: "Project Gamma", date: "2024-01-05" },
    ];

    const handleLogout = () => {
        router.push("/")
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} name="Profile" width={width || 'max-w-sm'} height={height || 'h-[60vh]'}

            className={`${className} rounded-lg`}>
           <div className="flex flex-col items-center py-6 px-8">
                {/* Profile Section */}
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <User2 className="w-10 h-10 text-blue-500" />
                </div>

                <div className="text-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">John Doe</h2>
                    <p className="text-gray-500 text-sm">johndoe@example.com</p>
                </div>

                {/* Projects Section */}
                <div className="w-full mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FolderKanban className="w-4 h-4 text-blue-500" />
                        <h3 className="text-sm font-medium text-gray-900">Recent Projects</h3>
                    </div>
                    <div className="space-y-1">
                        {projects.map(project => (
                            <div 
                                key={project.id}
                                className="flex justify-between items-center py-2 px-3 hover:bg-gray-50 rounded-md transition-colors"
                            >
                                <span className="text-sm text-gray-900">{project.name}</span>
                                <span className="text-xs text-gray-500">{project.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </Modal>
    )
}

export default Profilepage