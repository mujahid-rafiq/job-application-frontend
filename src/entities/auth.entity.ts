import * as Yup from "yup";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export const loginInitialValues: LoginRequest = {
  email: "",
  password: "",
};

export const registerInitialValues: RegisterRequest = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required").trim(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required").trim(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
