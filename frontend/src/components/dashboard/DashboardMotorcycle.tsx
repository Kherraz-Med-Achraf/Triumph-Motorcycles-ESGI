import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { getApiUrl } from "../../config/apiUrls";
import { logout } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import DataTable from "../ui/DataTable";
import CreateMotorcycleModal from "../auth/CreateMotorcycleModal";
import EditMotorcycleModal from "../ui/motorcycle/EditMotorcycleModal";
import { html } from "gridjs";
import CheckMaintenanceComponent from "./CheckMaintenanceComponent";


export type Motorcycle = {
  id: string;
  vin: string;
  model: string;
  concessionId: string;
  createdAt: string;
 
  intervalType?: string;
  intervalValue?: number;
};

const DashboardMotorcycle: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motorcycle | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "view">("edit");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchMotorcycles = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        dispatch(logout());
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

      if (resp.status === 401) {
        toast.error("Session expirée, veuillez vous reconnecter.");
        dispatch(logout());
        navigate("/");
        return;
      }

      if (!resp.ok) {
        toast.error("Erreur lors de la récupération des motos.");
        return;
      }

      const data = await resp.json();
      setMotorcycles(data);
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur serveur.");
    }
  };

  const handleDelete = async (id: string) => {
    toast.warn(
      <div className="toast-confirm">
        <p>Voulez-vous vraiment supprimer cette moto ?</p>
        <div className="toast-buttons">
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem("jwtToken");
                const resp = await fetch(`${getApiUrl()}/motorcycles/${id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                if (!resp.ok) {
                  toast.error("Erreur lors de la suppression de la moto.");
                  return;
                }

                toast.success("Moto supprimée avec succès.");
                fetchMotorcycles();
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
    fetchMotorcycles();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.matches(".edit-btn")) {
        const motoId = target.getAttribute("data-id");
        if (motoId) {
          const moto = motorcycles.find((m) => m.id === motoId);
          if (moto) {
            setModalMode("edit");
            setSelectedMotorcycle(moto);
          }
        }
      } else if (target.matches(".view-btn")) {
        const motoId = target.getAttribute("data-id");
        if (motoId) {
          const moto = motorcycles.find((m) => m.id === motoId);
          if (moto) {
            setModalMode("view");
            setSelectedMotorcycle(moto);
          }
        }
      } else if (target.matches(".delete-btn")) {
        const motoId = target.getAttribute("data-id");
        if (motoId) {
          handleDelete(motoId);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [motorcycles]);

  return (
    <div className="dashboard__title">
      <h1>Bienvenue dans le tableau de bord des Motos</h1>
      <div className="action">
        <button onClick={() => setShowModal(true)} className="create-btn">
          Créer une nouvelle moto
        </button>
      </div>

      <CreateMotorcycleModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onMotorcycleCreated={fetchMotorcycles}
      />

      {selectedMotorcycle && (
        <EditMotorcycleModal
          show={!!selectedMotorcycle}
          onClose={() => setSelectedMotorcycle(null)}
          motorcycle={selectedMotorcycle}
          onMotorcycleUpdated={fetchMotorcycles}
          mode={modalMode}
        />
      )}

      <h2>Liste des motos</h2>
      <DataTable
        columns={[
          { id: "vin", name: "VIN" },
          { id: "model", name: "Modèle" },
          { id: "concessionId", name: "Concession" },
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
        data={motorcycles.map((moto) => ({
          id: moto.id,
          vin: moto.vin,
          model: moto.model,
          concessionId: moto.concessionId,
          createdAt: new Date(moto.createdAt).toLocaleDateString(),
          actions: moto.id,
        }))}
        search
        pagination
        sort
      />
      <CheckMaintenanceComponent />
    </div>
  );
};

export default DashboardMotorcycle;
