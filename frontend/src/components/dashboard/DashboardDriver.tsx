import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DataTable from "../ui/DataTable";
import { html } from "gridjs";
import { getApiUrl } from "../../config/apiUrls";
import SignUpModal from "../auth/SignUpModal";
import EditDriverModal from "../ui/user/EditDriverModal";

export type UserBody = {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
  createdAt: string;
  experience?: string;
  licenseExpiration?: string;
  licenseCountry?: string;
  licenseNumber?: string;
  companyId?: string;
  companyMotorcycleId?: string;
};

export type Company = {
  id: string;
  name: string;
};

export type Motorcycle = {
  id: string;
  model: string;
};

const DashboardDriver: React.FC = () => {
  const [users, setUsers] = useState<UserBody[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "view">("edit");
  const navigate = useNavigate();

  
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
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
        navigate("/");
        return;
      }
      if (!resp.ok) {
        toast.error("Erreur lors de la récupération des utilisateurs.");
        return;
      }
      const data = await resp.json();
      const drivers = data.filter((user: UserBody) => user.role === "DRIVER");
      setUsers(drivers);
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur serveur.");
    }
  };

 
  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        navigate("/");
        return;
      }
      const resp = await fetch(`${getApiUrl()}/companies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp.ok) {
        toast.error("Erreur lors de la récupération des entreprises.");
        return;
      }
      const data = await resp.json();
      setCompanies(data);
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur serveur lors de la récupération des entreprises.");
    }
  };

 
  const fetchMotorcycles = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        navigate("/");
        return;
      }
      const resp = await fetch(`${getApiUrl()}/motorcycles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp.ok) {
        toast.error("Erreur lors de la récupération des motos.");
        return;
      }
      const data = await resp.json();
      setMotorcycles(data);
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur serveur lors de la récupération des motos.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
    fetchMotorcycles();
  }, []);


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches(".view-btn")) {
        const userId = target.getAttribute("data-id");
        if (userId) {
          setModalMode("view");
          setSelectedDriverId(userId);
        }
        return;
      }
      if (target.matches(".edit-btn")) {
        const userId = target.getAttribute("data-id");
        if (userId) {
          setModalMode("edit");
          setSelectedDriverId(userId);
        }
        return;
      }
      if (target.matches(".delete-btn")) {
        const userId = target.getAttribute("data-id");
        if (userId) {
          handleDelete(userId);
        }
        return;
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [users]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce driver ?")) return;
    try {
      const token = localStorage.getItem("jwtToken");
      const resp = await fetch(`${getApiUrl()}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp.ok) {
        toast.error("Erreur lors de la suppression du driver.");
        return;
      }
      toast.success("Driver supprimé avec succès.");
      fetchUsers();
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur serveur lors de la suppression du driver.");
    }
  };

  return (
    <div className="dashboard__title">
      <h1>Tableau de bord Driver</h1>
      <div className="action">
        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          Créer un nouveau driver
        </button>
      </div>


      {showCreateModal && (
        <SignUpModal
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onUserCreated={fetchUsers}

        />
      )}

  
      {selectedDriverId && (
        <EditDriverModal
          show={true}
          onClose={() => setSelectedDriverId(null)}
          driverId={selectedDriverId}
          onDriverUpdated={fetchUsers}
          mode={modalMode}
          motorcycles={motorcycles}
        />
      )}

      <h2>Liste des drivers</h2>
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
        data={users.map((user) => {
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            fullName: `${user.prenom} ${user.nom}`,
            actions: user.id,
          };
        })}
        search
        pagination
        sort
      />
    </div>
  );
};

export default DashboardDriver;
