import * as Yup from "yup";

export class CreateJobDto {
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

    constructor(data: Partial<CreateJobDto> = {}) {
        this.id = data.id;
        this.title = data.title || "";
        this.company = data.company || "Code Upscale";
        this.category = data.category || "";
        this.location = data.location || "";
        this.salary = data.salary || "";
        this.jobType = data.jobType || "Full-time";
        this.isNew = data.isNew ?? true;
        this.isActive = data.isActive ?? true;
        this.description = data.description || "";
    }

    static yupSchema() {
        return Yup.object({
            id: Yup.string().optional(),
            title: Yup.string().required("Title is required").trim(),
            company: Yup.string().required("Company name is required").trim(),
            category: Yup.string().required("Category is required").trim(),
            location: Yup.string().required("Location is required").trim(),
            salary: Yup.string().required("Salary/Salary Range is required").trim(),
            jobType: Yup.string().required("Job Type is required").trim(),
            description: Yup.string().required("Description is required").trim(),
            isNew: Yup.boolean(),
            isActive: Yup.boolean(),
        });
    }
}
