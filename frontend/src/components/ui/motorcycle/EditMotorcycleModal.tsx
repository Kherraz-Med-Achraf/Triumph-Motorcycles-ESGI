import React, { useState, useEffect } from "react";
import { getApiUrl } from "../../../config/apiUrls";
import { toast } from "react-toastify";
import { Motorcycle } from "../../dashboard/DashboardMotorcycle";

type Concession = {
  id: string;
  name: string;
};

type EditMotorcycleModalProps = {
  show: boolean;
  onClose: () => void;
  motorcycle: Motorcycle; 
  onMotorcycleUpdated: () => void;
  mode: "edit" | "view";
};

const EditMotorcycleModal: React.FC<EditMotorcycleModalProps> = ({
  show,
  onClose,
  motorcycle,
  onMotorcycleUpdated,
  mode,
}) => {
  const [vin, setVin] = useState(motorcycle.vin);
  const [model, setModel] = useState(motorcycle.model);
  const [concessionId, setConcessionId] = useState(motorcycle.concessionId);
  const [intervalType, setIntervalType] = useState(motorcycle.intervalType || "");
  const [intervalValue, setIntervalValue] = useState<number | undefined>(
    motorcycle.intervalValue
  );
  const [concessions, setConcessions] = useState<Concession[]>([]);

  
  useEffect(() => {
    if (show) {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé.");
        return;
      }

      fetch(`${getApiUrl()}/motorcycles/vin/${motorcycle.vin}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Erreur lors de la récupération des détails de la moto.");
          }
          return resp.json();
        })
        .then((data) => {
     
          setVin(data.vin);
          setModel(data.model);
          setConcessionId(data.concessionId);
          setIntervalType(data.intervalType || "");
          setIntervalValue(data.intervalValue);
        })
        .catch((error) => {
          console.error("Erreur:", error);
          toast.error("Erreur lors de la récupération des détails de la moto.");
        });
    }
  }, [show, motorcycle.vin]);

 
  useEffect(() => {
    if (show) {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé.");
        return;
      }
      fetch(`${getApiUrl()}/concessions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Erreur lors de la récupération des concessions.");
          }
          return resp.json();
        })
        .then((data) => {
          setConcessions(data);
        })
        .catch((error) => {
          console.error("Erreur:", error);
          toast.error("Erreur lors de la récupération des concessions.");
        });
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("Aucun token trouvé.");
      return;
    }

    const payload: any = {
      vin,
      model,
      concessionId,
    };

    // Inclure les données d'intervalle si elles sont renseignées
    if (intervalType && intervalValue !== undefined) {
      payload.intervalType = intervalType;
      payload.intervalValue = intervalValue;
    }

    try {
      const resp = await fetch(`${getApiUrl()}/motorcycles/${motorcycle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        toast.error(errorData.message || "Erreur lors de la mise à jour de la moto.");
        return;
      }

      toast.success("Moto mise à jour avec succès.");
      onMotorcycleUpdated();
      onClose();
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur serveur.");
    }
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <h2>{mode === "edit" ? "Modifier la moto" : "Détails de la moto"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal__group">
            <label>VIN :</label>
            <input
              type="text"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              readOnly={mode === "view"}
              required
            />
          </div>
          <div className="modal__group">
            <label>Modèle :</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              readOnly={mode === "view"}
              required
            />
          </div>
          <div className="modal__group">
            <label>Concession :</label>
            <select
              value={concessionId}
              onChange={(e) => setConcessionId(e.target.value)}
              disabled={mode === "view"}
              required
            >
              <option value="">-- Sélectionnez une concession --</option>
              {concessions.map((concession) => (
                <option key={concession.id} value={concession.id}>
                  {concession.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal__group">
            <label>Type d'intervalle :</label>
            <select
              value={intervalType}
              onChange={(e) => setIntervalType(e.target.value)}
              disabled={mode === "view"}
            >
              <option value="">Sélectionnez</option>
              <option value="KM">KM</option>
              <option value="TIME">Temps</option>
            </select>
          </div>
          <div className="modal__group">
            <label>Valeur de l'intervalle :</label>
            <input
              type="number"
              value={intervalValue !== undefined ? intervalValue : ""}
              onChange={(e) =>
                setIntervalValue(e.target.value ? Number(e.target.value) : undefined)
              }
              readOnly={mode === "view"}
            />
          </div>
          <div className="modal__actions">
            {mode === "edit" ? (
              <>
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={onClose}>
                  Annuler
                </button>
              </>
            ) : (
              <button type="button" onClick={onClose}>
                Fermer
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMotorcycleModal;
