"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventClickArg, EventInput } from "@fullcalendar/core";
import CreateSlot from "./CreateSlot";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useJobStore } from "@/state/jobStore";


interface Slot {
    id: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    recruiter: {
        name: string;
    };
}

export const InterviewScheduler = () => {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const [interviewType, setInterviewType] = useState<string>("");
    const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
    const { applications, selectedJobId } = useJobStore();



    useEffect(() => {
        if (selectedJobId) {
            fetchSlots();
        }
    }, [selectedJobId]);

    const fetchSlots = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/interview/slots`);
            setSlots(response.data);
            toast.success("Slots fetched successfully");
        } catch (error) {
            console.error("Error fetching slots:", error);
            toast.error("Error fetching slots");
        }
    };

    const events: EventInput[] = slots.map((slot) => ({
        id: slot.id.toString(),
        title: `${slot.isBooked ? "Booked" : "Available"} ${new Date(slot.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        start: slot.startTime,
        end: slot.endTime,
        backgroundColor: slot.isBooked ? "#FEE2E2" : "#DCFCE7",
        textColor: slot.isBooked ? "#DC2626" : "#16A34A",
        borderColor: slot.isBooked ? "#DC2626" : "#16A34A",
        classNames: ['interview-slot', slot.isBooked ? 'booked' : 'available'],
    }));

    const calendarOption = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",
        events,
        eventClick: (info: EventClickArg) => {
            const slot = slots.find((s) => s.id.toString() === info.event.id);
            if (slot?.isBooked) {
                toast.error('This slot is already booked');
                return;
            }
            setSelectedSlot(slot || null);
        },
        slotMinTime: "09:00:00",
        slotMaxTime: "18:00:00",
        allDaySlot: false,
        slotDuration: "00:30:00",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay"
        },
        height: "auto",
        expandRows: true,
        stickyHeaderDates: true,
        nowIndicator: true,
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '09:00',
            endTime: '18:00',
        },
        weekends: false,
        validRange: {
            start: new Date().toISOString().split('T')[0],
        }
    }

    const handleScheduleInterview = async () => {
        if (!selectedSlot || !selectedApplication || !interviewType) {
            toast.error("Please select a slot, application, and interview type");
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/interview/schedule`, {
                applicationId: Number(selectedApplication),
                interviewType,
                slotId: selectedSlot.id,
                interviewerName: selectedSlot.recruiter.name,
            });
            console.log(response.data)
            toast.success("Interview scheduled successfully");
            fetchSlots();
            setSelectedSlot(null);
            setSelectedApplication(null);
            setInterviewType("");
        } catch (error) {
            console.error("Error scheduling interview:", error);
            toast.error("Error scheduling interview");
        }
    };

    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold mb-4">Interview Scheduler</h1>
                <CreateSlot onSlotCreated={fetchSlots} />
            </div>
            {/* {!selectedJobId && (
                    <Alert>
                        <AlertDescription>
                            Please select a job to view and schedule interviews
                        </AlertDescription>
                    </Alert>
                )} */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <FullCalendar {...calendarOption} />
            </div>
            {selectedSlot && (
                <div className="mt-4 p-4 border rounded-md shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold mb-2">Schedule Interview</h2>
                    <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-lg font-semibold">Selected Time Slot</p>
                        <p className="font-medium cursor-pointer">
                            {new Date(selectedSlot.startTime).toLocaleString([], {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>


                    </div>
                    <Select
                        onValueChange={(value) => setSelectedApplication(Number(value))}
                        value={selectedApplication ? selectedApplication.toString() : undefined}
                    >
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Select an application" />
                        </SelectTrigger>
                        <SelectContent>
                            {applications.length > 0 ? (
                                applications.map((app) => (
                                    <SelectItem className="space-x-4" key={app.id} value={app.id.toString()}>
                                        {app.user?.name} - {app.user?.email} (Job ID: {app.jobId})
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="none" disabled>No applications available</SelectItem>
                            )}
                        </SelectContent>
                    </Select>

                    <Select onValueChange={setInterviewType} value={interviewType}>
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Select interview type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PHONE_SCREENING">Phone Screening</SelectItem>
                            <SelectItem value="ONSITE">Onsite</SelectItem>
                            <SelectItem value="TECHNICAL">Technical</SelectItem>
                            <SelectItem value="BEHAVIORAL">Behavioral</SelectItem>
                            <SelectItem value="FINAL">Final</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* BEHAVIORAL */}

                    <Button className="mt-2" onClick={handleScheduleInterview}>
                        Schedule Interview
                    </Button>
                </div>
            )}
        </div>
    );
}
