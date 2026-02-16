import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ROUTES } from '../../app-routes/constants';
import { MailIcon, LockIcon, EyeIcon, EyeSlashIcon } from '../../components/Common/SvgIcons';
import { loginSchema } from '../../entities/user.entity';
import { Role } from '../../enums/role.enums';
import { toast } from 'react-hot-toast';
import BaseInput from '../../components/form/base-input';
import Button from '../../components/form/buttons/base-button';
import useMutateLogin from '../../react-query-hooks/user/useMutateLogin';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';
import { LoginDto } from '../../dto/login.dto';

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useMutateLogin();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: new LoginDto(),
        validationSchema: LoginDto.yupSchema(),
        onSubmit: async (values: LoginDto, { setSubmitting }) => {
            try {
                const loginData = {
                    email: values.email,
                    password: values.password
                };

                // Using mutateAsync to get the response in try/catch
                const response = await loginMutation.mutateAsync(loginData);

                setSubmitting(false);
                toast.success('Login successful!');

                // Dispatch to Redux
                dispatch(setCredentials({
                    user: response.user,
                    token: response.accessToken
                }));

                // Role-based redirection
                if (response.user.role === Role.ADMIN) {
                    navigate(ROUTES.ADMIN_JOBS);
                } else {
                    navigate(ROUTES.CAREER);
                }
            } catch (err: any) {
                console.error('Login error:', err);
                setSubmitting(false);
                const message = err.response?.data?.message || err.response?.data?.detail || 'Login failed';
                toast.error(message);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[100px] opacity-50"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                            <span className="text-white text-2xl font-bold font-mono">C</span>
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to={ROUTES.SIGNUP} className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            Create a free account
                        </Link>
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20">
                    <form className="mt-2 space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="space-y-4">
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
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 font-medium">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="#" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loginMutation.isPending}
                                btnClass="py-3 px-4 font-bold rounded-xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-all bg-blue-600 hover:bg-blue-700 h-12"
                            >
                                {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </div>
                    </form>

                    {/* or login with email or facebook */}

                    {/* <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-400 font-medium">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors active:scale-95">
                                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                                <span className="text-sm font-semibold text-gray-700">Google</span>
                            </button>
                            <button className="flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors active:scale-95">
                                <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" />
                                <span className="text-sm font-semibold text-gray-700">Facebook</span>
                            </button>
                        </div>
                    </div> */}
                </div>

                <p className="text-center text-xs text-gray-400 mt-8">
                    &copy; 2026 Code Upscale. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
