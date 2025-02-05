import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getApiUrl } from "../../config/apiUrls";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import SignUpModal from "../auth/SignUpModal";
import DataTable from "../ui/DataTable";
import "../../styles/components/dashboard/DashboardHome.scss";
export type UserRole =
  | "ADMIN"
  | "MANAGER_COMPANY"
  | "MANAGER_CONCESSION"
  | "CLIENT"
  | "DRIVER";
export type UserExperience = "NOVICE" | "INTERMEDIATE" | "EXPERT";

const DashboardHome: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const isAdmin = user?.role === "ADMIN";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface UserBody {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    role: UserRole;
    createdAt: string;
    motorcycleId?: string;
    licenseExpiration?: string;
    licenseCountry?: string;
    licenseNumber?: string;
    address?: string;
    experience?: UserExperience;
  }
  const [users, setUsers] = useState<UserBody[]>([]);

  let message = "Bienvenue dans le tableau de bord";
  if (user) {
    switch (user.role) {
      case "ADMIN":
        message = "Bienvenue dans le tableau de bord de l'administrateur";
        break;
      case "MANAGER_COMPANY":
        message = "Bienvenue dans le tableau de bord du manager de la company";
        break;
      case "MANAGER_CONCESSION":
        message =
          "Bienvenue dans le tableau de bord du manager de la concession";
        break;
      case "CLIENT":
        message = "Bienvenue dans le tableau de bord Client";
        break;
      case "DRIVER":
        message = "Bienvenue dans le tableau de bord Driver";
        break;
      default:
        message = "Bienvenue dans le tableau de bord";
        break;
    }
  }

  const fetchUsers = async () => {
    
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        dispatch(logout());
        navigate("/");
        return;
      }
  
      const resp = await fetch(`${getApiUrl()}/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (resp.status === 401) {
        toast.error("Session expirée, veuillez vous reconnecter.");
        dispatch(logout()); 
        navigate("/");
        return;
      }
  
      if (!resp.ok) {
        toast.error("Erreur lors de la récupération des utilisateurs.");
        return;
      }
  
      const data = await resp.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur serveur.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="dashboard__home">
      <h1>{message}</h1>
      <div className="action">
        <button
          onClick={() => setShowModal(true)}
          className="create-btn"
        >
          Créer un nouvel utilisateur
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="create-btn"
        >
          Créer une nouvelle entreprise
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="create-btn"
        >
          Créer une nouvelle Concession
        </button>
      </div>
      <SignUpModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onUserCreated={fetchUsers}
        isAdmin={isAdmin}
      />

      <h2>Liste des utilisateurs</h2>
      <DataTable
        columns={[
          { id: "email", name: "Email" },
          { id: "role", name: "Rôle" },
          { id: "createdAt", name: "Date de création" },
        ]}
        data={users.map((user) => [
          user.email,
          user.role,
          new Date(user.createdAt).toLocaleDateString(),
        ])}
        search
        pagination
        sort
      />
    </div>
  );
};

export default DashboardHome;
