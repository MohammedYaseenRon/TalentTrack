import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { ModalProps } from '@/state/api';
import { LogOut, User2, FolderKanban } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Profile,ProfileProject } from '@/state/api';
    

const Profilepage: React.FC<ModalProps> = ({ isOpen, onClose, width, className, height }) => {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [projects, setProjects] = useState<ProfileProject[]>([]);


    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Token retrieved from localStorage:", token);

                if (!token) {
                    console.log("Authentication token is missing");
                    return;
                }

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                const user = response.data;
                setProfile(user);
                setProjects(user.project || []);

            } catch (error) {
                console.error("Error fetching user data", error);
            }

        }
        fetchProfileDetails();
    }, [])


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
                    <h2 className="text-lg font-semibold text-gray-900">{profile?.name || "User "}</h2>
                    <p className="text-gray-500 text-sm">{profile?.email || "No email available"}</p>
                    <p className="text-gray-500 text-sm">Projects Created: {projects.length}</p>
                </div>

                {/* Projects Section */}
                <div className="w-full mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FolderKanban className="w-4 h-4 text-blue-500" />
                        <h3 className="text-sm font-medium text-gray-900">Recent Projects</h3>
                    </div>
                    <div className="space-y-1">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex justify-between items-center py-2 px-3 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <span className="text-sm text-gray-900">{project.name}</span>
                                    <span className="text-xs text-gray-500">{new Date(project.createdAt).toLocaleDateString()}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No projects found.</p>
                        )}
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