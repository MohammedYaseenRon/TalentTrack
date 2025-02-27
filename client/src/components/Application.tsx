import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";
import { useJobStore } from "@/state/jobStore";
import { ArrowRight, User } from "lucide-react";
import Link from "next/link";







export default function Applications() {
    const { applications, fetchApplications, selectedJobId } = useJobStore();

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);
            try {
                const message: { type: string; data: any } = JSON.parse(event.data);

                if (message.type === "NEW_APPLICATION") {
                    useJobStore.setState((state) => ({
                        applications: [message.data, ...state.applications], // ✅ Updating Zustand store directly
                    }));
                }
            } catch (error) {   
                console.error("Error parsing WebSocket message:", error);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => ws.close();

    }, [])

    return (
        <div className="space-y-8">
            {applications.map((application) => (
                <div key={application.id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-2">
                            <p className="text-sm font-medium leading-none">{application.user?.name}</p>
                            <p className="text-sm text-muted-foreground">{application.user?.email}</p>
                        </div>
                    </div>
                    <div className="font-medium mb-4">
                        <Link href="/recruiter/jobOffer"><Button variant="ghost" size="sm" className="flex items-center gap-2">
                            Review
                            <ArrowRight />
                        </Button></Link>
                    </div>

                </div>
            ))}

        </div>
    )
}