import React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import SignUp from "./Components/pages/SignUp/SignUp";
import SignIn from "./Components/pages/SignIn/SignIn";
import DashboardMainDashboard from "./Components/Bills/Dashboard/Dashboard";
import MonthlyList from "./Components/Bills/MonthlyBase/MonthyList";
import Revenues from "./Components/Bills/revenues/revenues";
import Expenses from "./Components/Bills/expenses/expenses";
import Balances from "./Components/Bills/balances/balances";
import Profile from "./Components/Bills/profile/profile";
import Settings from "./Components/Bills/profile/profile";
import PrivateRoute from "./PrivateRoute";
import Layout from './Components/pages/Layout/Layout';

const AppRoutes = () => (
  <BrowserRouter>
    <RouterRoutes>
      <Route path="/"
        element={
          <PrivateRoute>
            <Layout>
              <DashboardMainDashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
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
        path="/balances"
        element={
          <PrivateRoute>
            <Layout>
              <Balances />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <PrivateRoute>
            <Layout>
              <Expenses />
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
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Layout>
              <Settings />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Layout>
              <Profile />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>Page not found</h1>} />
    </RouterRoutes>
  </BrowserRouter>
);

export default AppRoutes;
