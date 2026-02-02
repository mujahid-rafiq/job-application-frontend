import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  createJobInitialValues,
  jobValidationSchema,
  type CreateJobRequest,
} from "../entities";
import { jobApiService } from "../api";
import BaseInput from "../components/form/base-input";
import BaseTextArea from "../components/form/base-text-area";
import Button from "../components/buttons/base-button";

function getErrorMessage(err: any): string {
  const data = err.response?.data;
  if (!data) return err.message || "Network error. Is backend running?";
  const msg = data.message;
  if (Array.isArray(msg)) return msg.join(" ");
  if (typeof msg === "string") return msg;
  return data.error || "Something went wrong.";
}

function buildPayload(values: CreateJobRequest): CreateJobRequest {
  const payload: CreateJobRequest = {
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    position: values.position.trim(),
  };
  if (values.experience?.trim()) payload.experience = values.experience.trim();
  if (values.coverLetter?.trim()) payload.coverLetter = values.coverLetter.trim();
  return payload;
}

export default function JobsApplyPage() {
  const form = useFormik<CreateJobRequest>({
    initialValues: createJobInitialValues,
    validationSchema: jobValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await jobApiService.create(buildPayload(values));
        toast.success("Application submitted!");
        resetForm();
      } catch (err: any) {
        toast.error(getErrorMessage(err));
      }
    },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Apply for a Job</h1>

      <form onSubmit={form.handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
        <BaseInput formik={form} name="fullName" label="Full Name" placeholder="Your full name" required />
        <BaseInput formik={form} name="email" label="Email" type="email" placeholder="Your email" required />
        <BaseInput formik={form} name="phone" label="Phone" placeholder="Your phone" required />
        <BaseInput formik={form} name="position" label="Position" placeholder="Position name" required />
        <BaseInput formik={form} name="experience" label="Experience" placeholder="e.g. 2 years" />
        <BaseTextArea formik={form} name="coverLetter" label="Cover Letter" placeholder="Your message" rows={4} />
        <Button type="submit" variant="primar">
          Submit
        </Button>
      </form>
    </div>
  );
}
