import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants";
import JobsApplyPage from "../pages/JobsApplyPage";
import JobsListPage from "../pages/JobsListPage";
import Layout from "../components/Layout";

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME} element={<JobsApplyPage />} />
        <Route path={ROUTES.JOBLISTING} element={<JobsListPage />} />
        <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;