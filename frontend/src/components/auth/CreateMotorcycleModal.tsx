import React, { useState, useEffect } from "react";
import { getApiUrl } from "../../config/apiUrls";
import { toast } from "react-toastify";

type Concession = {
  id: string;
  name: string;
};

type CreateMotorcycleModalProps = {
  show: boolean;
  onClose: () => void;
  onMotorcycleCreated: () => void;
};

const CreateMotorcycleModal: React.FC<CreateMotorcycleModalProps> = ({
  show,
  onClose,
  onMotorcycleCreated,
}) => {
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");
  const [concessionId, setConcessionId] = useState("");
  const [intervalType, setIntervalType] = useState(""); // "KM" ou "TIME"
  const [intervalValue, setIntervalValue] = useState<number | undefined>(undefined);
  const [concessions, setConcessions] = useState<Concession[]>([]);

  
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

    if (intervalType && intervalValue !== undefined) {
      payload.intervalType = intervalType;
      payload.intervalValue = intervalValue;
    }

    try {
      const resp = await fetch(`${getApiUrl()}/motorcycles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        toast.error(errorData.message || "Erreur lors de la création de la moto.");
        return;
      }

      toast.success("Moto créée avec succès.");
      onMotorcycleCreated();
      onClose();

      
      setVin("");
      setModel("");
      setConcessionId("");
      setIntervalType("");
      setIntervalValue(undefined);
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur serveur.");
    }
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <h2>Créer une nouvelle moto</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal__group">
            <label>VIN :</label>
            <input
              type="text"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              required
            />
          </div>
          <div className="modal__group">
            <label>Modèle :</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
          <div className="modal__group">
            <label>Concession :</label>
            <select
              value={concessionId}
              onChange={(e) => setConcessionId(e.target.value)}
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
            />
          </div>
          <div className="modal__actions">
            <button type="submit">Créer</button>
            <button type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMotorcycleModal;
