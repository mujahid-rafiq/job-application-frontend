import { useFormik } from "formik";
import { Link } from "react-router-dom";
import BaseInput from "../components/form/base-input";
import Button from "../components/buttons/base-button";
import { ROUTES } from "../app-routes/constants";
import {
  loginInitialValues,
  loginValidationSchema,
  type LoginRequest,
} from "../entities";

export default function LoginPage() {
  const form = useFormik<LoginRequest>({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      // TODO: add your login API call here and save token
      console.log("Login submit", values);
    },
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Log in</h1>
            <p className="text-slate-300 text-sm mt-1">Enter your email and password</p>
          </div>
          <form onSubmit={form.handleSubmit} className="p-8 space-y-5">
            <BaseInput
              formik={form}
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <BaseInput
              formik={form}
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              required
            />
            <Button type="submit" variant="primary" fullWidth>
              Log in
            </Button>
            <p className="text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link to={ROUTES.SIGNUP} className="text-[#0A5185] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
