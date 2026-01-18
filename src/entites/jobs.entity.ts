import * as Yup from "yup";

export class NewJobs {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  position?: string;
  yearOfExperience?: string;
  coverLetter?: string;

  static validateYupSchema() {
    return Yup.object().shape({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      position: Yup.string().required("Position is required"),
      yearOfExperience: Yup.string().required(
        "Years of experience is required"
      ),
      coverLetter: Yup.string().required("Cover letter is required"),
    });
  }
}
