import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants";
import { JobsApplyPage, JobsListPage } from "../pages";
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
