"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";




interface SignupProps {
    name: string,
    email: string,
    password: string,
    role: 'RECRUITER' | 'JOB_SEEKER';
}

export default function Signup() {
    const [formData, setFormData] = useState<SignupProps>({
        name: "",
        email: "",
        password: "",
        role: "JOB_SEEKER" //default value
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setFormData({ name: "", email: "", password: "", role: "JOB_SEEKER" });
    }, []);

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const errorMessages: string[] = [];

        if (!formData.name) {
            errorMessages.push('Name is required.');
        }

        if (!formData.email) {
            errorMessages.push('Email is required.');
        }

        // Check if password is empty or too short
        if (!formData.password) {
            errorMessages.push('Password is required.');
        } else if (formData.password.length < 6) {
            errorMessages.push('Password must be at least 6 characters.');
        }
        setErrors(errorMessages);
        return errorMessages.length === 0;

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!validateForm()) return;
        // Perform signup logic (e.g., API request)

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, formData);
            setFormData({ name: '', email: '', password: '', role: 'JOB_SEEKER' });
            const { token, user } = response.data;


            localStorage.setItem('token', token);
            if (user.role === "RECRUITER") {
                router.push("/recruiter")
            } else if (user.role === "JOB_SEEKER") {
                router.push("/jobSeeker")
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error during signup", error.message);
                setErrors([error.message]);
            } else {
                console.error("Error during signup", error);
                setErrors(["Something went wrong!"]);
            }
        }

    }

    const [errors, setErrors] = useState<string[]>([]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-blue-100 p-6">
            <Card className="w-full max-w-lg shadow-xl rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-md p-6 transition-all hover:shadow-2xl">
                <CardHeader className="relative">
                    <CardTitle className="text-4xl font-bold text-center text-gray-800 tracking-tight">
                        Welcome Back
                    </CardTitle>
                    <p className="text-center text-sm text-gray-500 mt-1">Sign in to continue your journey</p>
                </CardHeader>
                <CardContent className="mt-2">
                    {errors.length > 0 && (
                        <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertTitle className="text-red-700">Error</AlertTitle>
                            <AlertDescription className="text-red-600">
                                {errors.map((err, index) => (
                                    <p key={index}>{err}</p>
                                ))}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700 font-medium">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-gray-700 font-medium">Role</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(value: 'RECRUITER' | 'JOB_SEEKER') => handleChange('role', value)}
                            >
                                <SelectTrigger className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl bg-white shadow-lg">
                                    <SelectItem value="JOB_SEEKER" className="hover:bg-indigo-50">Job Seeker</SelectItem>
                                    <SelectItem value="RECRUITER" className="hover:bg-indigo-50">Recruiter</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl py-3 font-semibold hover:from-indigo-600 hover:to-blue-700 transition-all disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Sign Up'}
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/auth/login" className="text-indigo-600 hover:underline font-medium">Log in</a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
