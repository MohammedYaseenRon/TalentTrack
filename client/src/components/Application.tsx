import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";


const recentApplication = [
    {
        name: "Mohammed usmani",
        email: "usmani123@gmail.com",
        avatar: "/placeholder.svg",
        position: "Senior Android developer"
    },
    {
        name: "Anurag maurya",
        email: "anuragi123@gmail.com",
        avatar: "/placeholder.svg",
        position: "Full stack dev"
    },
    {
        name: "Mohammed samir",
        email: "samiri123@gmail.com",
        avatar: "/placeholder.svg",
        position: "Junior developer"
    },
    {
        name: "Mohammed Yaseen",
        email: "yaseeni123@gmail.com",
        avatar: "/placeholder.svg",
        position: "Full stack developer"
    }
]


export default function Applications() {
    return (
        <div className="space-y-8">
            {recentApplication.map((application) => (
                <div key={application.email} className="flex items-center">
                    <Avatar className="h-8 w-8 pl-2">
                        <AvatarImage src={application.avatar} alt="Profile " />
                        <AvatarFallback>{application.name.split('').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-2">
                        <p className="text-sm font-medium leading-none">{application.name}</p>
                        <p className="text-sm text-muted-foreground">{application.email}</p>
                    </div>
                    <div className="ml-auto font-medium">
                        <Button variant="ghost" size="sm">
                            Review
                        </Button>
                    </div>

                </div>
            ))}

        </div>
    )
}