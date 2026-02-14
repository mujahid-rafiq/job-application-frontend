import * as Yup from 'yup';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'candidate';
    avatar?: string;
    createdAt: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export const loginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export const signupSchema = Yup.object({
    firstName: Yup.string()
        .min(2, 'First name is too short')
        .max(50, 'First name is too long')
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, 'Last name is too short')
        .max(50, 'Last name is too long')
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Password is required'),
    terms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('Required'),
});
