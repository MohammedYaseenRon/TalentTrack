"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from  "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import axios from "axios";

 


interface SignupProps {
    name:string,
    email:string,
    password:string,
    role: 'RECRUITER' | 'JOBSEEKER';
}

export default function Signup() {
   const [formData,setFormData] = useState<SignupProps>({
    name:"",
    email:"",
    password:"",
    role:"JOBSEEKER" //default value
   });


    const [errors,setErrors] = useState<string[]>([]);
    const [loading,setLoading] = useState(false);
    const router = useRouter();

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
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errorMessages.push('Email is invalid.');
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

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!validateForm()) return;
            // Perform signup logic (e.g., API request)

        try{
            const response = await axios.post("http://localhost:4000/auth/signup", formData);
            console.log("Signup successful:", response.data);
            setFormData({ name: '', email: '', password: '', role: 'JOBSEEKER' }); 
            router.push('/auth/login');  
        }catch(error:any) {
            console.error("Error during signup",error);
            setErrors([error.response?.data?.message || "Something went wrong!"]);
        }finally{
            setLoading(false);
        }
        
        

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    {errors.length > 0 && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {errors.map((err, index) => (
                                    <p key={index}>{err}</p>
                                ))}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select 
                                value={formData.role}
                                onValueChange={(value: 'RECRUITER' | 'JOBSEEKER') => handleChange('role', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="JOBSEEKER">Job Seeker</SelectItem>
                                    <SelectItem value="RECRUITER">Recruiter</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
