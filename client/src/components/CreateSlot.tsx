"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";




export default function CreateSlot({ onSlotCreated }: { onSlotCreated: () => void }) {
    const [startTime, setStartTime] = useState(" ");
    const [endTime, setEndTime] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateSlotTimes = (start: Date, end: Date) => {
        const now = new Date();
        const minDuration = 30;
        const maxDuration = 30;

        if (start < now) {
            toast.error("Start time cannot be in the past");
            return false;
        }
        if (end <= start) {
            toast.error("End time must be after the start");
            return false;
        }

        const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
        if (durationMinutes < minDuration) {
            toast.error(`Slot duration must be at least ${minDuration} minutes`);
            return false;
        }
        if (durationMinutes > maxDuration) {
            toast.error(`Slot duration cannot exceed ${maxDuration} minutes`);
            return false;
        }

        const startHour = start.getHours();
        const endHour = start.getHours();
        if (startHour < 9 && endHour > 18) {
            toast.error("Slots must be between 9 AM and 6 PM");
            return false;
        }

        return true;
    }


    const handleCreateSlot = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Authenticate token is required");
            return;
        }
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        if (!validateSlotTimes(startDate, endDate)) {
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:4000/interview/slots", {
                startTime: startDate.toISOString(),
                endTime: endDate.toISOString(),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            if (response.status == 201) {
                console.log("Slot created successfullay");
                toast.success("Slot created succesfully");
                onSlotCreated();
                setIsOpen(false);
                setEndTime("");
                setStartTime("");
            } else {
                throw new Error("Failed to create slot")
            }

        } catch (error) {
            console.error("Failed to create a slot");
            toast.error("Error while creating slot")
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create New Slot</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Interview Slot</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                    <form onSubmit={handleCreateSlot} className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="startTime"
                                className="text-sm font-medium text-gray-700"
                            >
                                Start Time
                            </label>
                            <Input
                                type="datetime-local"
                                id="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                                min={new Date().toISOString().slice(0, 16)}
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="endTime"
                                className="text-sm font-medium text-gray-700"
                            >
                                End Time
                            </label>
                            <Input
                                type="datetime-local"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                                min={startTime}
                                className="w-full"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Create Slot
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>

    )
}