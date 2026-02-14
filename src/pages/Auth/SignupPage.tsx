import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ROUTES } from '../../app-routes/constants';
import { MailIcon, LockIcon, UserIcon, EyeIcon, EyeSlashIcon } from '../../components/Common/SvgIcons';
import { signupSchema } from '../../entities/user.entity';
import BaseInput from '../../components/form/base-input';
import Button from '../../components/form/buttons/base-button';

const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            terms: false,
        },
        validationSchema: signupSchema,
        onSubmit: (values) => {
            console.log('Signup attempt:', values);
            // Integration will be handled by the user
            navigate(ROUTES.LOGIN);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[100px] opacity-50"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                            <span className="text-white text-2xl font-bold font-mono">C</span>
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to={ROUTES.LOGIN} className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20">
                    <form className="mt-2 space-y-5" onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <BaseInput
                                formik={formik}
                                name="firstName"
                                label="First Name"
                                type="text"
                                required
                                placeholder="John"
                                inputPrepend={<UserIcon className="h-5 w-5 text-gray-400" />}
                                className="!my-0"
                            />
                            <BaseInput
                                formik={formik}
                                name="lastName"
                                label="Last Name"
                                type="text"
                                required
                                placeholder="Doe"
                                inputPrepend={<UserIcon className="h-5 w-5 text-gray-400" />}
                                className="!my-0"
                            />
                        </div>

                        <BaseInput
                            formik={formik}
                            name="email"
                            label="Email Address"
                            type="email"
                            required
                            placeholder="name@company.com"
                            inputPrepend={<MailIcon className="h-5 w-5 text-gray-400" />}
                            className="!my-0"
                        />

                        <BaseInput
                            formik={formik}
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="••••••••"
                            inputPrepend={<LockIcon className="h-5 w-5 text-gray-400" />}
                            inputAppend={
                                <button
                                    type="button"
                                    className="flex items-center justify-center transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            }
                            className="!my-0"
                        />
                        <p className="text-xs text-gray-500 px-1 -mt-3">
                            Must contain at least 8 characters, one uppercase, and one number.
                        </p>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-start pt-1">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer ${formik.touched.terms && formik.errors.terms ? 'border-red-500' : ''}`}
                                        checked={formik.values.terms}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="text-gray-500">
                                        I agree to the{' '}
                                        <Link to="#" className="text-blue-600 font-semibold hover:text-blue-500">Terms of Service</Link>
                                        {' '}and{' '}
                                        <Link to="#" className="text-blue-600 font-semibold hover:text-blue-500">Privacy Policy</Link>.
                                    </label>
                                </div>
                            </div>
                            {formik.touched.terms && formik.errors.terms && (
                                <span className="text-red-400 text-xs px-8">{formik.errors.terms}</span>
                            )}
                        </div>

                        <div className="pt-2">
                            <Button
                                variant="primary"
                                type="submit"
                                btnClass="py-3 px-4 font-bold rounded-xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-all bg-blue-600 hover:bg-blue-700 h-12"
                            >
                                Create Account
                            </Button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 bg-white text-gray-400 font-medium italic">Join the community</span>
                            </div>
                        </div>

                        <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest font-bold">
                            Powered by Code Upscale
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
