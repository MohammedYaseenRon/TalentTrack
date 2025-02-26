import { Star } from "lucide-react";

interface TestimonialProps {
    rating: number;
    name: string;
    role: string;
    feedback: string;
    isActive: boolean;
}

export const TestimonialCard: React.FC<TestimonialProps> = ({ rating, name, role, feedback, isActive }) => {
    return (
        <div
            className={`transition-transform duration-500 ease-in-out bg-white p-6 rounded-xl shadow-lg text-center w-80 h-auto
                ${isActive ? "scale-110 shadow-2xl" : "scale-90 opacity-60 blur-sm"}
            `}
        >
            <div className="flex justify-start mt-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index} className={`text-2xl ${index < rating ? "text-yellow-400" : "text-gray-300"}`}>
                        <Star size={20} />
                    </span>
                ))}
            </div>
            <div className="text-start">
                <p className="italic text-gray-600 mt-3">"{feedback}"</p>
                <h3 className="text-lg font-semibold mt-8">{name}</h3>
                <p className="text-sm font-bold text-gray-500 ">{role}</p>
            </div>

        </div>
    );
};
