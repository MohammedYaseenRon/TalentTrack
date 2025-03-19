"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TaskData } from '@/state/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProjectImage } from '@/components/ProjectsCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { useTaskStore } from '@/state/jobStore';


const TaskPage = () => {
  const { tasks, loading, setLoading, fetchTasks } = useTaskStore();
  const [expandedTasks, setExpandedTasks] = useState<{ [key: number]: boolean }>({});
  const [selectedTask, setSelectedTasks] = useState<TaskData | null>(null)
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (task: TaskData) => {
    setSelectedTasks(task)
    setIsModalOpen(true);
  }

  const toggleReadMore = (taskId: number) => {
    setExpandedTasks((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitTask = async () => {
    if (!submissionUrl) {
      return alert('Please enter a valid url');
    }
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.log("Authentication token is missing")
        return
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${selectedTask?.id}/submit`, {
        submissonUrl: submissionUrl,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(response.data);
      if (response.status == 201) {
        setSubmissionUrl("");
        setIsModalOpen(false);
      }
      toast.success("Submission successfully for the particular task");
    } catch (error) {
      console.log("Error while submitting tasks", error);
    }
  }
  return (
    <div>
      <ScrollArea className="flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4">
          <div className="space-y-4">
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-2xl transition-all duration-300 border border-gray-200 rounded-2xl ">
                  <CardHeader className="p-5 border-b border-gray-100">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {task.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6 p-5">
                    {/* Task Image */}
                    <div className="w-full h-48 overflow-hidden rounded-lg">
                      <ProjectImage
                        imageUrl={task.taskImage?.[0]?.url}
                        altText={task.title || "Project"}
                        className="w-full h-full object-cover transform transition duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Task Description */}
                    <p className="text-base font-medium text-gray-700">
                      {expandedTasks[task.id] ? task.description : `${task.description.slice(0, 100)}...`}
                      {task.description.length > 100 && (
                        <button
                          onClick={() => toggleReadMore(task.id)}
                          className="text-blue-500 font-semibold ml-2"
                        >
                          {expandedTasks[task.id] ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </p>

                    {/* Task Deadline */}
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="text-sm font-semibold">Deadline:</span>
                      <span className="text-sm px-3 py-1 bg-gray-100 rounded-full">
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Apply Button */}
                    <Button onClick={() => handleOpenModal(task)} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 rounded-lg transition-all hover:shadow-lg">
                      <h2 className="text-lg">Apply</h2>
                    </Button>
                  </CardContent>
                </Card>

              ))}

            </div>
          </div>
        </div>
      </ScrollArea >
      {selectedTask && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Task for {selectedTask.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input type="text" placeholder="Enter submission URL" value={submissionUrl} onChange={(e) => setSubmissionUrl(e.target.value)} />
              <Button className="w-full bg-blue-600 text-white" onClick={handleSubmitTask}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>

  )
}

export default TaskPage