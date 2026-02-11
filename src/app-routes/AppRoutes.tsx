import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants";
import { JobsApplyPage, JobsListPage, LoginPage, SignupPage } from "../pages";
import Layout from "../components/Layout";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path={ROUTES.HOME} element={<JobsApplyPage />} />
              <Route path={ROUTES.JOBLISTING} element={<JobsListPage />} />
              <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
