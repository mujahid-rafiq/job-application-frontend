import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants";
import CareerPage from "../pages/CareerPage";
import JobDetailsPage from "../pages/JobDetailsPage";
import AdminJobsPage from "../pages/AdminJobsPage";
import AdminJobFormPage from "../pages/AdminJobFormPage";
import Layout from "../components/Layout";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.CAREER} element={<CareerPage />} />
      <Route path={ROUTES.JOB_DETAILS} element={<JobDetailsPage />} />
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
