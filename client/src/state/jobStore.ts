import { create } from 'zustand'
import axios from 'axios'
import { JobOfferProps, ApplicationProps } from '@/state/api'

interface JobStore {
  jobs: JobOfferProps[]
  applications: ApplicationProps[]
  selectedJobId: number | null
  loading: boolean
  fetchingApplications: boolean
  error: string | null
  fetchJobs: () => Promise<void>
  deleteJob: (jobId: number) => Promise<void>;
  fetchApplications: (jobId: number) => Promise<void>
  updateApplicationStatus: (applicationId: number, newStatus: string) => Promise<void>
  setSelectedJobId: (jobId: number | null) => void
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  applications: [],
  selectedJobId: null,
  loading: false,
  fetchingApplications: false,
  error: null,

  fetchJobs: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get("http://localhost:4000/jobs")
      set({ jobs: response.data, loading: false })
    } catch (error) {
      console.error("Error while fetching Jobs", error)
      set({ error: "Failed to fetch jobs", loading: false })
    }
  },

  deleteJob: async (jobId: number) => {
    try {
      const response = await axios.delete(`http://localhost:4000/jobs/${jobId}`);
      set((state) => ({
        jobs: state.jobs.filter((job) => job.id !== jobId),
      })); 
      // console.log("Delete this job", jobId);
      console.log(response.data);
    } catch (error) {
      console.log("Error while deleting Jobs",error);
      set({ error: "Failed to delete job" });

    }
  },

  fetchApplications: async (jobId: number) => {
    set({ fetchingApplications: true, error: null })
    try {
      const response = await axios.get(`http://localhost:4000/application/job/${jobId}`)
      set({ applications: response.data, selectedJobId: jobId, fetchingApplications: false })
    } catch (error) {
      console.error("Error while fetching applications", error)
      set({ error: "Failed to fetch applications", fetchingApplications: false })
    }
  },

  updateApplicationStatus: async (applicationId: number, newStatus: string) => {
    try {
      const response = await axios.patch(`http://localhost:4000/application/${applicationId}/status`, { status: newStatus })
      if (response.status === 200) {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === applicationId ? { ...app, status: newStatus } : app
          )
        }))
      } else {
        throw new Error('Failed to update application status')
      }
    } catch (error) {
      console.error('Error updating status', error)
      set({ error: 'Failed to update application status' })
    }
  },

  setSelectedJobId: (jobId: number | null) => set({ selectedJobId: jobId }),
}))
