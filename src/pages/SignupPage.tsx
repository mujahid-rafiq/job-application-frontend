import { useFormik } from "formik";
import { Link } from "react-router-dom";
import BaseInput from "../components/form/base-input";
import Button from "../components/buttons/base-button";
import { ROUTES } from "../app-routes/constants";
import {
  registerInitialValues,
  registerValidationSchema,
  type RegisterRequest,
} from "../entities";

export default function SignupPage() {
  const form = useFormik<RegisterRequest>({
    initialValues: registerInitialValues,
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      // TODO: add your register API call here
      console.log("Signup submit", values);
    },
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Sign up</h1>
            <p className="text-slate-300 text-sm mt-1">Create an account with your email</p>
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
              placeholder="At least 6 characters"
              required
            />
            <Button type="submit" variant="primary" fullWidth>
              Sign up
            </Button>
            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to={ROUTES.LOGIN} className="text-[#0A5185] font-medium hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
