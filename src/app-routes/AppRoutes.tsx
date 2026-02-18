import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants";
import AdminJobsPage from "../pages/Admin/AdminJobsPage";
import AdminJobFormPage from "../pages/Admin/AdminJobFormPage";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import VerifyOtpPage from "../pages/Auth/VerifyOtpPage";
import Layout from "../components/Layout/Layout";
import CareerPage from "../pages/career/CareerPage";
import JobDetailsPage from "../pages/career/JobDetailsPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.CAREER} element={<CareerPage />} />
      <Route path={ROUTES.JOB_DETAILS} element={<JobDetailsPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path={ROUTES.ADMIN_JOBS} element={<AdminJobsPage />} />
              <Route path={ROUTES.ADMIN_CREATE_JOB} element={<AdminJobFormPage />} />
              <Route path={ROUTES.ADMIN_EDIT_JOB} element={<AdminJobFormPage />} />
              <Route path="/" element={<Navigate to={ROUTES.CAREER} replace />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
