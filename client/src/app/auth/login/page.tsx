"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface loginProps {
    email: string,
    password: string
}

export default function Login() {
    const [formData, setFormData] = useState<loginProps>({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string | null>(null);
    const router = useRouter();


    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value })
    }

    const validateForm = () => {
        if (!formData.email) return 'Email is required.';
        if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Invalid email format.';
        if (!formData.password) return 'Password is required.';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(null);

        const validateError = validateForm();
        if (validateError) {
            setErrors(validateError);
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, formData, {
                headers: { "Content-Type": "application/json" },
            })
            setFormData({ password: " ", email: " " })
            const { token, user } = response.data;


            localStorage.setItem('token', token);
            if (user.role === "RECRUITER") {
                router.push("/recruiter")
            } else if (user.role === "JOB_SEEKER") {
                router.push("/jobSeeker")
            }
        } catch (error) {
            console.error('Login error', error);
            setErrors("Something went wrong!");

        } finally {
            setLoading(false)
        }



    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-blue-100 p-6">
            <Card className="w-full max-w-lg shadow-xl rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-md p-6 transition-all hover:shadow-2xl">
                <CardHeader className="relative">
                    <CardTitle className="text-4xl font-bold text-center text-gray-800 tracking-tight">
                        Sign In
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {errors && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{errors}</AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className='text-gray-700'>Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg"

                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className='text-gray-700'>Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl py-3 font-semibold hover:from-indigo-600 hover:to-blue-700 transition-all disabled:opacity-50" disabled={loading}>
                            {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Sign In'}
                        </Button>
                        <p className='text-center text-gray-600 text-sm'>
                            Don&apos;t have an account?{" "}
                            <Link href="/auth/signup">
                                <span className="text-blue-600 font-semibold hover:underline">Signup</span>
                            </Link>
                        </p>
                    </form>

                </CardContent>
            </Card>

        </div>
    )
}