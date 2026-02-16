import * as Yup from 'yup';
import { Role } from '../enums/role.enums';

export class SignupDto {
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    role: Role = Role.USER;
    terms = false;

    static yupSchema() {
        return Yup.object({
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
    }
}
