import React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import SignUp from "./Components/pages/SignUp/SignUp";
import SignIn from "./Components/pages/SignIn/SignIn";
import DashboardMainDashboard from "./Components/Bills/Dashboard/Dashboard";
import MonthlyList from "./Components/Bills/MonthlyBase/MonthyList";
import Revenues from "./Components/Bills/revenues/revenues";
import Expenses from "./Components/Bills/expenses/expenses";
import Balances from "./Components/Bills/balances/balances";
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
      <Route path="*" element={<h1>Page not found</h1>} />
    </RouterRoutes>
  </BrowserRouter>
);

export default AppRoutes;
