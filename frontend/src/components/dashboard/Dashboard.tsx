import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/components/dashboard/dashboard.scss";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <nav className="dashboard__sidebar">
        <h2 className="dashboard__logo">Dashboard</h2>
        <ul className="dashboard__nav">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive ? "dashboard__link active" : "dashboard__link"
              }
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/company"
              className={({ isActive }) =>
                isActive ? "dashboard__link active" : "dashboard__link"
              }
            >
              Company
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/concession"
              className={({ isActive }) =>
                isActive ? "dashboard__link active" : "dashboard__link"
              }
            >
              Concession
            </NavLink>
          </li>
           <li>
            <NavLink
              to="/dashboard/moto"
              className={({ isActive }) =>
                isActive ? "dashboard__link active" : "dashboard__link"
              }
            >
              Moto
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/client"
              className={({ isActive }) =>
                isActive ? "dashboard__link active" : "dashboard__link"
              }
            >
              Client
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/driver"
              className={({ isActive }) =>
                isActive ? "dashboard__link active" : "dashboard__link"
              }
            >
              Driver
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/companyMotorcycle"
              className={({ isActive }) =>
                isActive ? "dashboard__link active" : "dashboard__link"
              }
            >
              Flotte company
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="dashboard__content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
