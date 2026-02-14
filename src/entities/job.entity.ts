import * as Yup from "yup";

// This refers to a user's application for a job
export interface JobApplication {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience?: string;
  coverLetter?: string;
  createdAt: string;
}

// This refers to a job opening/posting (Admin)
export interface JobPosting {
  id?: string;
  title: string;
  company: string;
  category: string;
  location: string;
  salary: string;
  jobType: string;
  isNew: boolean;
  isActive: boolean;
  description: string;
  createdAt?: string;
}

export type CreateJobRequest = Omit<JobApplication, "id" | "createdAt">;

export const createJobInitialValues: CreateJobRequest = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  coverLetter: "",
};

export const jobApplicationValidationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required").trim(),
  email: Yup.string().email("Invalid email").required("Email is required").trim(),
  phone: Yup.string().required("Phone is required").trim(),
  position: Yup.string().required("Position is required").trim(),
  experience: Yup.string().optional().trim(),
  coverLetter: Yup.string().optional().trim(),
});

export const jobPostingValidationSchema = Yup.object({
  title: Yup.string().required("Title is required").trim(),
  company: Yup.string().required("Company name is required").trim(),
  category: Yup.string().required("Category is required").trim(),
  location: Yup.string().required("Location is required").trim(),
  salary: Yup.string().required("Salary/Salary Range is required").trim(),
  jobType: Yup.string().required("Job Type is required").trim(),
  description: Yup.string().required("Description is required").trim(),
});

