// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SwitchBackend from "./components/SwitchBackend";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardHome from "./components/dashboard/DashboardHome";
import DashboardCompany from "./components/dashboard/DashboardCompany";
import DashboardConcession from "./components/dashboard/DashboardConcession";
import DashboardClient from "./components/dashboard/DashboardClient";
import DashboardDriver from "./components/dashboard/DashboardDriver";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <SwitchBackend />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Route par défaut /dashboard */}
          <Route index element={<DashboardHome />} />
          <Route path="company" element={<DashboardCompany />} />
          <Route path="concession" element={<DashboardConcession />} />
          <Route path="client" element={<DashboardClient />} />
          <Route path="driver" element={<DashboardDriver />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
