import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../app-routes/constants';
import Button from '../../components/form/buttons/base-button';
import { authApiService } from '../../api/services/auth-api.service';

const VerifyOtpPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (!email) {
            navigate(ROUTES.SIGNUP);
        }
    }, [email, navigate]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');

        if (otpValue.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await authApiService.verifyOtp({ email, otp: otpValue });

            // Success - redirect to login page
            navigate(ROUTES.LOGIN);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to verify OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        // TODO: Implement resend OTP functionality
        console.log('Resend OTP for:', email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[100px] opacity-50"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200">
                            <span className="text-white text-3xl">🔐</span>
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
                        Verify Your Email
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We've sent a 6-digit code to
                    </p>
                    <p className="text-sm font-semibold text-blue-600">{email}</p>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                                Enter OTP Code
                            </label>
                            <div className="flex justify-center gap-2" onPaste={handlePaste}>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${error
                                            ? 'border-red-300 bg-red-50'
                                            : digit
                                                ? 'border-purple-500 bg-purple-50'
                                                : 'border-gray-300 bg-white'
                                            }`}
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>
                            {error && (
                                <p className="mt-3 text-sm text-red-600 text-center font-medium">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="pt-2">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                                btnClass="py-3 px-4 font-bold rounded-xl shadow-lg shadow-purple-200 active:scale-[0.98] transition-all bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12"
                            >
                                {loading ? 'Verifying...' : 'Verify Email'}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Didn't receive the code?{' '}
                            <button
                                type="button"
                                onClick={handleResend}
                                className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
                            >
                                Resend OTP
                            </button>
                        </p>
                        <p className="mt-4 text-xs text-gray-500">
                            ⏰ OTP expires in 10 minutes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtpPage;
