import React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import SignUp from "./Components/pages/SignUp";
import SignIn from "./Components/pages/SignIn";
import DashboardMainDashboard from "./Components/Bills/Dashboard/Dashboard";
import MonthlyList from "./Components/Bills/MonthlyBase/MonthyList";
import Revenues from "./Components/Bills/revenues/revenues";
import Monthly from "./Components/Bills/MonthlyBase/Monthy";
import PrivateRoute from "./PrivateRoute";
import Layout from './Components/pages/Layout/Layout';

const AppRoutes = () => (
  <BrowserRouter>
    <RouterRoutes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <DashboardMainDashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/monthlylist"
        element={
          <PrivateRoute>
            <Layout>
              <MonthlyList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/monthly/:id"
        element={
          <PrivateRoute>
            <Layout>
              <Monthly />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/balance"
        element={
          <PrivateRoute>
            <Layout>
              <Revenues />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <PrivateRoute>
            <Layout>
              <Revenues />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/revenues"
        element={
          <PrivateRoute>
            <Layout>
              <Revenues />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>Page not found</h1>} />
    </RouterRoutes>
  </BrowserRouter>
);

export default AppRoutes;
