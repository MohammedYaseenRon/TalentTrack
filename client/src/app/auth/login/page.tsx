    "use client";

    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
    import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
    import { AlertCircle, Axis3DIcon } from 'lucide-react';
    import React, { useState } from 'react'
    import { Label } from '@/components/ui/label'
    import { Input } from '@/components/ui/input'
    import { Button } from '@/components/ui/button'
    import axios from 'axios';
    import Link from 'next/link';
    import { useRouter } from 'next/navigation';




    interface loginProps {
        email:string,
        password:string
    }

    export default function Login() {
        const [formData,setFormData] = useState<loginProps>({
            email:"",
            password:""
        });
        const [loading,setLoading] = useState(false);
        const [errors,setErrors] = useState<string | null>(null);
        const router = useRouter();


        const handleChange = (name:string, value:string) => {
            setFormData({...formData, [name]:value})
        }

        const validateForm = () => {
            if (!formData.email) return 'Email is required.';
            if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Invalid email format.';
            if (!formData.password) return 'Password is required.';
            return null;
        };

        const handleSubmit = async (e:React.FormEvent) => {
            e.preventDefault();
            setErrors(null);

            const validateError = validateForm();
            if(validateError){
                setErrors(validateError);
                return;
            }
            setLoading(true);

                try{  
                    const response = await axios.post("http://localhost:4000/auth/login",formData ,{
                        headers: { "Content-Type": "application/json" },
                    })
                    const {token,user} = response.data;

                    console.log('Login response:', response.data);
                    localStorage.setItem('token',token);
                    console.log('Logged in succesfully:', response.data)
                    console.log("Response Data:", response.data);

                    router.push("/jobSeeker");
                }catch(error:any) {
                    console.error('Login error', error);
                    setErrors(error.response?.data?.message || "Something went wrong!");
                    
                }finally{
                    setLoading(false)
                }


        };  


        return (
            <div className='flex justify-center items-center min-h-screen bg-gray-400 p-4'>
                <Card className='w-full max-w-md'>
                    <CardHeader>
                        <CardTitle className='text-2xl font-semibold'>Login</CardTitle>
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

                            <p className='font-bold text-base text-center'>Don't have an account?<Link href="/auth/signup"><span className='border-b border-blue-600'> Signup</span></Link></p>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>

                    </CardContent>
                </Card>

            </div>
        )
    }