import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { getApiUrl } from "../../config/apiUrls";
import { logout } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import DataTable from "../ui/DataTable";
import CreateCompanyModal from "../auth/CreateCompanyModal";
import EditCompanyModal from "../ui/company/EditCompanyModal";
import { html } from "gridjs";

export type Company = {
  id: string;
  name: string;
  createdAt: string;
  address: string;
};

const DashboardCompany: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "view">("edit");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        dispatch(logout());
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

      if (resp.status === 401) {
        toast.error("Session expirée, veuillez vous reconnecter.");
        dispatch(logout());
        navigate("/");
        return;
      }

      if (!resp.ok) {
        toast.error("Erreur lors de la récupération des entreprises.");
        return;
      }

      const data = await resp.json();
      setCompanies(data);
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur serveur.");
    }
  };

  const handleDelete = async (id: string) => {
    toast.warn(
      <div className="toast-confirm">
        <p>Voulez-vous vraiment supprimer cette entreprise ?</p>
        <div className="toast-buttons">
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem("jwtToken");
                const resp = await fetch(`${getApiUrl()}/companies/${id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                if (!resp.ok) {
                  toast.error("Erreur lors de la suppression de l'entreprise.");
                  return;
                }

                toast.success("Entreprise supprimée avec succès.");
                fetchCompanies();
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
    fetchCompanies();
  }, []);

  
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.matches(".edit-btn")) {
        const companyId = target.getAttribute("data-id");
        if (companyId) {
          const company = companies.find((c) => c.id === companyId);
          if (company) {
            setModalMode("edit");
            setSelectedCompany(company);
          }
        }
      } else if (target.matches(".view-btn")) {
        const companyId = target.getAttribute("data-id");
        if (companyId) {
          const company = companies.find((c) => c.id === companyId);
          if (company) {
            setModalMode("view");
            setSelectedCompany(company);
          }
        }
      } else if (target.matches(".delete-btn")) {
        const companyId = target.getAttribute("data-id");
        if (
          companyId
        ) {
          handleDelete(companyId);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [companies]);

  return (
    <div className="dashboard__title">
      <h1>Bienvenue dans le tableau de bord des Entreprises</h1>
      <div className="action">
        <button onClick={() => setShowModal(true)} className="create-btn">
          Créer une nouvelle entreprise
        </button>
      </div>

      <CreateCompanyModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCompanyCreated={fetchCompanies}
      />

      {selectedCompany && (
        <EditCompanyModal
          show={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          company={selectedCompany}
          onCompanyUpdated={fetchCompanies}
          mode={modalMode} 
        />
      )}

      <h2>Liste des entreprises</h2>
      <DataTable
        columns={[
          { id: "name", name: "Nom" },
          { id: "address", name: "Adresse" },
          { id: "createdAt", name: "Date de création" },
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
        data={companies.map((company) => ({
          id: company.id,
          name: company.name,
          address: company.address,
          createdAt: new Date(company.createdAt).toLocaleDateString(),
          actions: company.id,
        }))}
        search
        pagination
        sort
      />
    </div>
  );
};

export default DashboardCompany;
