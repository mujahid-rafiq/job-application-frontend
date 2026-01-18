import { useFormik } from "formik";
import React, { useState } from "react";
import { NewJobs } from "../entites/jobs.entity";
import { error } from "console";
import BaseInput from "../components/form/base-input";
import BaseTextArea from "../components/form/base-text-area";
import BaseFileInput from "../components/form/FileInput";
import FileUpload from "../components/form/FileUpload";
import Button from "../components/buttons/base-button";
import BaseSelect from "../components/form/base-select";
// import FileUpload from '../form/FileUpload';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
}

const JobsApplyPage: React.FC = () => {
  // const [formData, setFormData] = useState<FormData>({
  //   fullName: '',
  //   email: '',
  //   phone: '',
  //   position: '',
  //   experience: '',
  //   resume: null,
  //   coverLetter: ''
  // });

  const jobForm = useFormik<NewJobs>({
    initialValues: new NewJobs(),
    validationSchema: NewJobs.validateYupSchema(),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Call your API or submit logic here
        // await submitJob(values); // example function
        resetForm(); // reset form on success
      } catch (error: any) {
        console.error(error);
        // Optionally show a toast or error message
      }
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    // setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
  };

  return (
    // <form onSubmit={formik?.handleSubmit}>
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Apply for a Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <BaseInput label="fullName" placeholder="Enter You Full Name" />

        <BaseInput label="Email" placeholder="Enter You email" />

        <BaseInput label="Phone" placeholder="Enter Your phone" />

        <BaseInput label="Position Applying For" placeholder="Enter Your Posiiton Name" />
        <BaseInput label="experience" placeholder="Enter Your   experience" />

      

        <BaseTextArea label="Text Area" placeholder="Enter Detail Message" />

        {/* <FileUpload /> */}

        <Button variant="primar">Submit Application</Button>
      </form>
    </div>
    // </form>
  );
};

export default JobsApplyPage;
