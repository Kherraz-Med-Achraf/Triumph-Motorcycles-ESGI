import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DataTable from "../ui/DataTable";
import { html } from "gridjs";
import { getApiUrl } from "../../config/apiUrls";
import CreateCompanyMotorcycleModal from "../auth/CreateCompanyMotorcycleModal";
import EditCompanyMotorcycleModal from "../ui/companymotorcycle/EditCompanyMotorcycleModal";

interface CompanyMotorcycle {
  id: string;
  companyId: string;
  motorcycleId: string;
  assignedAt: string; 
  createdAt: string;
}

interface Company {
  id: string;
  name: string;
}

interface Motorcycle {
  id: string;
  model: string;
}

const DashboardCompanyMotorcycles: React.FC = () => {
  const [liaisons, setLiaisons] = useState<CompanyMotorcycle[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLien, setSelectedLien] = useState<CompanyMotorcycle | null>(null);

  const navigate = useNavigate();


  const fetchLiaisons = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        navigate("/");
        return;
      }
      const resp = await fetch(`${getApiUrl()}/company-motorcycles`, {
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
        toast.error("Erreur lors de la récupération des liaisons.");
        return;
      }
      const data = await resp.json();
      setLiaisons(data);
    } catch (error) {
      console.error("Erreur serveur:", error);
      toast.error("Erreur serveur lors de la récupération des liaisons.");
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
      console.error("Erreur serveur:", error);
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
      console.error("Erreur serveur:", error);
      toast.error("Erreur serveur lors de la récupération des motos.");
    }
  };

  useEffect(() => {
    fetchLiaisons();
    fetchCompanies();
    fetchMotorcycles();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const editBtn = target.closest(".edit-btn") as HTMLElement | null;
      if (editBtn) {
        const id = editBtn.getAttribute("data-id");
        console.log("edit-btn data-id:", id);
        if (id) {
          const lien = liaisons.find((l) => l.id === id);
          if (lien) {
            console.log("lien trouvé:", lien);
            setSelectedLien(lien);
            setShowEditModal(true);
          }
        }
        return;
      }
      const deleteBtn = target.closest(".delete-btn") as HTMLElement | null;
      if (deleteBtn) {
        const id = deleteBtn.getAttribute("data-id");
        if (id) {
          handleDelete(id);
        }
        return;
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [liaisons]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette liaison ?")) {
      return;
    }
    try {
      const token = localStorage.getItem("jwtToken");
      const resp = await fetch(`${getApiUrl()}/company-motorcycles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp.ok) {
        toast.error("Erreur lors de la suppression de la liaison.");
        return;
      }
      toast.success("Liaison supprimée avec succès.");
      fetchLiaisons();
    } catch (error) {
      console.error("Erreur serveur:", error);
      toast.error("Erreur serveur lors de la suppression de la liaison.");
    }
  };

  return (
    <div className="dashboard__title">
      <h1>Dashboard des liaisons Entreprise - Moto</h1>
      <div className="action">
        <button onClick={() => setShowCreateModal(true)} className="create-btn">
          Créer une nouvelle liaison
        </button>
      </div>

      {/* Affichage des modales */}
      {showCreateModal && (
        <CreateCompanyMotorcycleModal
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onLiaisonCreated={fetchLiaisons}
          companies={companies}
          motorcycles={motorcycles}
        />
      )}

      {showEditModal && selectedLien && (
        <EditCompanyMotorcycleModal
          show={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedLien(null);
          }}
          liaison={selectedLien}
          onLiaisonUpdated={fetchLiaisons}
          companies={companies}
          motorcycles={motorcycles}
        />
      )}

      <h2>Liste des liaisons</h2>
      <DataTable
        columns={[
          { id: "company", name: "Entreprise" },
          { id: "motorcycle", name: "Moto" },
          { id: "assignedAt", name: "Assigné le" },
          {
            id: "actions",
            name: "Actions",
            formatter: (cell, row) => {
              return html(`
                <div>
                  <button class="edit-btn" data-id="${cell}">Modifier</button>
                  <button class="delete-btn" data-id="${cell}">Supprimer</button>
                </div>
              `);
            },
          },
        ]}
        data={liaisons.map((lien) => {
          const company = companies.find((c) => c.id === lien.companyId);
          const moto = motorcycles.find((m) => m.id === lien.motorcycleId);
          return {
            id: lien.id,
            company: company ? company.name : lien.companyId,
            motorcycle: moto ? moto.model : lien.motorcycleId,
            assignedAt: new Date(lien.assignedAt).toLocaleDateString(),
            actions: lien.id, 
          };
        })}
        search
        pagination
        sort
      />
    </div>
  );
};

export default DashboardCompanyMotorcycles;
