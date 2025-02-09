import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { getApiUrl } from "../../config/apiUrls";
import { logout } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import DataTable from "../ui/DataTable";
import CreateConcessionModal from "../auth/CreateConcessionModal";
import EditConcessionModal from "../ui/concession/EditConcessionModal";
import { html } from "gridjs";

export type Concession = {
  id: string;
  name: string;
  createdAt: string;
  address: string;
};

const DashboardConcession: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [concessions, setConcessions] = useState<Concession[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedConcession, setSelectedConcession] = useState<Concession | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "view">("edit");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConcessions = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        dispatch(logout());
        navigate("/");
        return;
      }

      const resp = await fetch(`${getApiUrl()}/concessions`, {
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
        toast.error("Erreur lors de la récupération des concessions.");
        return;
      }

      const data = await resp.json();
      setConcessions(data);
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur serveur.");
    }
  };

  const handleDelete = async (id: string) => {
    toast.warn(
      <div className="toast-confirm">
        <p>Voulez-vous vraiment supprimer cette concession ?</p>
        <div className="toast-buttons">
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem("jwtToken");
                const resp = await fetch(`${getApiUrl()}/concessions/${id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                if (!resp.ok) {
                  toast.error("Erreur lors de la suppression de la concession.");
                  return;
                }

                toast.success("Concession supprimée avec succès.");
                fetchConcessions();
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
    fetchConcessions();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.matches(".edit-btn")) {
        const concessionId = target.getAttribute("data-id");
        if (concessionId) {
          const concession = concessions.find((c) => c.id === concessionId);
          if (concession) {
            setModalMode("edit");
            setSelectedConcession(concession);
          }
        }
      } else if (target.matches(".view-btn")) {
        const concessionId = target.getAttribute("data-id");
        if (concessionId) {
          const concession = concessions.find((c) => c.id === concessionId);
          if (concession) {
            setModalMode("view");
            setSelectedConcession(concession);
          }
        }
      } else if (target.matches(".delete-btn")) {
        const concessionId = target.getAttribute("data-id");
        if (concessionId) {
          handleDelete(concessionId);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [concessions]);

  return (
    <div className="dashboard__title">
      <h1>Bienvenue dans le tableau de bord des Concessions</h1>
      <div className="action">
        <button onClick={() => setShowModal(true)} className="create-btn">
          Créer une nouvelle concession
        </button>
      </div>

      <CreateConcessionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConcessionCreated={fetchConcessions}
      />

      {selectedConcession && (
        <EditConcessionModal
          show={!!selectedConcession}
          onClose={() => setSelectedConcession(null)}
          concession={selectedConcession}
          onConcessionUpdated={fetchConcessions}
          mode={modalMode}
        />
      )}

      <h2>Liste des concessions</h2>
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
        data={concessions.map((concession) => ({
          id: concession.id,
          name: concession.name,
          address: concession.address,
          createdAt: new Date(concession.createdAt).toLocaleDateString(),
          actions: concession.id,
        }))}
        search
        pagination
        sort
      />
    </div>
  );
};

export default DashboardConcession;
