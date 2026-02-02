import * as Yup from "yup";

export interface CreateJobRequest {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience?: string;
  coverLetter?: string;
}

export interface Job {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience?: string;
  coverLetter?: string;
  createdAt: string;
}

export const createJobInitialValues: CreateJobRequest = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  coverLetter: "",
};

export const jobValidationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required").trim(),
  email: Yup.string().email("Invalid email").required("Email is required").trim(),
  phone: Yup.string().required("Phone is required").trim(),
  position: Yup.string().required("Position is required").trim(),
  experience: Yup.string().optional().trim(),
  coverLetter: Yup.string().optional().trim(),
});
