import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { getApiUrl } from "../../config/apiUrls";
import { logout } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import SignUpModal from "../auth/SignUpModal";
import DataTable from "../ui/DataTable";
import { html } from "gridjs";
import EditUserModal from "../ui/user/EditUserModal";

export type UserRole =
  | "ADMIN"
  | "MANAGER_COMPANY"
  | "MANAGER_CONCESSION"
  | "CLIENT"
  | "DRIVER";
export type UserExperience = "NOVICE" | "INTERMEDIATE" | "EXPERT";

// On ajoute une propriété id pour identifier chaque utilisateur
export interface UserBody {
  id: string;
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

const DashboardHome: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserBody | null>(null);
  // mode de la modale : "edit" pour modification, "view" pour affichage
  const [modalMode, setModalMode] = useState<"edit" | "view">("edit");
  const isAdmin = user?.role === "ADMIN";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserBody[]>([]);

  let message = "Bienvenue dans le tableau de bord";
  if (user) {
    switch (user.role) {
      case "ADMIN":
        message = "Bienvenue dans le tableau de bord de l'administrateur";
        break;
      case "MANAGER_COMPANY":
        message = "Bienvenue dans le tableau de bord du manager de la company";
        navigate("/dashboard/company");
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

  const handleDelete = async (id: string) => {
    // Exemple de confirmation avec toast (vous pouvez adapter selon vos besoins)
    toast.warn(
      <div className="toast-confirm">
        <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
        <div className="toast-buttons">
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem("jwtToken");
                const resp = await fetch(`${getApiUrl()}/users/${id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                if (!resp.ok) {
                  toast.error(
                    "Erreur lors de la suppression de l'utilisateur."
                  );
                  return;
                }
                toast.success("Utilisateur supprimé avec succès.");
                fetchUsers();
              } catch (error) {
                toast.error("Erreur serveur.");
              }
            }}
            className="confirm-yes"
          >
            Oui
          </button>
          <button onClick={() => toast.dismiss()} className="confirm-no">
            Non
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Délégation d’événements pour capter les clics sur les boutons générés par Grid.js
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches(".edit-btn")) {
        const userId = target.getAttribute("data-id");
        if (userId) {
          const foundUser = users.find((u) => u.id === userId);
          if (foundUser) {
            setModalMode("edit");
            setSelectedUser(foundUser);
          }
        }
      } else if (target.matches(".view-btn")) {
        const userId = target.getAttribute("data-id");
        if (userId) {
          const foundUser = users.find((u) => u.id === userId);
          if (foundUser) {
            setModalMode("view");
            setSelectedUser(foundUser);
          }
        }
      } else if (target.matches(".delete-btn")) {
        const userId = target.getAttribute("data-id");
        if (userId) {
          handleDelete(userId);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [users]);

  return (
    <div className="dashboard__title">
      <h1>{message}</h1>
      <div className="action">
        <button onClick={() => setShowModal(true)} className="create-btn">
          Créer un nouvel utilisateur
        </button>
        <button
          onClick={() => navigate("/dashboard/company")}
          className="create-btn"
        >
          Créer une nouvelle entreprise
        </button>
        <button onClick={() => setShowModal(true)} className="create-btn">
          Créer une nouvelle concession
        </button>
        <button onClick={() => setShowModal(true)} className="create-btn">
          Créer une nouvelle moto
        </button>
      </div>

      {/* Modal pour créer un nouvel utilisateur */}
      <SignUpModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onUserCreated={fetchUsers}
        isAdmin={isAdmin}
      />

      {selectedUser && (
        <EditUserModal
          show={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
          onUserUpdated={fetchUsers}
          mode={modalMode} 
        />
      )}

      <h2>Liste des utilisateurs</h2>
      <DataTable
        columns={[
          { id: "email", name: "Email" },
          { id: "role", name: "Rôle" },
          { id: "fullName", name: "Nom & Prénom" },
          {
            id: "actions",
            name: "Actions",
            formatter: (cell, row) => {
              return html(`
          <div>
            <button class="view-btn" data-id="${cell}">Afficher</button>
            <button class="edit-btn" data-id="${cell}">Modifier</button>
            <button class="delete-btn" data-id="${cell}">Supprimer</button>
          </div>
        `);
            },
          },
        ]}
        data={users.map((user) => ({
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: `${user.prenom} ${user.nom}`,
          actions: user.id,
        }))}
        search
        pagination
        sort
      />
    </div>
  );
};

export default DashboardHome;
