import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getApiUrl } from "../../../config/apiUrls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/slices/authSlice";
import "../../../styles/components/auth/Modal.scss";

interface Company {
  id: string;
  name: string;
}

interface Motorcycle {
  id: string;
  model: string;
}

export interface CompanyMotorcycle {
  id: string;
  companyId: string;
  motorcycleId: string;
  assignedAt: string;
  createdAt: string;
}

interface EditCompanyMotorcycleModalProps {
  show: boolean;
  onClose: () => void;
  liaison: CompanyMotorcycle;
  onLiaisonUpdated: () => void;
  companies: Company[];
  motorcycles: Motorcycle[];
  mode?: "edit" | "view";
}

const EditCompanyMotorcycleModal: React.FC<EditCompanyMotorcycleModalProps> = ({
  show,
  onClose,
  liaison,
  onLiaisonUpdated,
  companies,
  motorcycles,
  mode = "edit",
}) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(liaison.companyId);
  const [selectedMotorcycleId, setSelectedMotorcycleId] = useState(liaison.motorcycleId);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setSelectedCompanyId(liaison.companyId);
      setSelectedMotorcycleId(liaison.motorcycleId);
      setErrors({});
    }
  }, [show, liaison]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "view") {
      onClose();
      return;
    }
    setErrors({});
    if (!selectedCompanyId) {
      setErrors((prev) => ({ ...prev, companyId: "Veuillez sélectionner une entreprise" }));
      return;
    }
    if (!selectedMotorcycleId) {
      setErrors((prev) => ({ ...prev, motorcycleId: "Veuillez sélectionner une moto" }));
      return;
    }

    const body = { companyId: selectedCompanyId, motorcycleId: selectedMotorcycleId };

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        dispatch(logout());
        navigate("/");
        return;
      }
      const resp = await fetch(`${getApiUrl()}/company-motorcycles/${liaison.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.message || "Erreur lors de la mise à jour de la liaison.");
        return;
      }
      toast.success("Liaison mise à jour avec succès !");
      onClose();
      onLiaisonUpdated();
    } catch (error) {
      console.error("Erreur serveur:", error);
      toast.error("Erreur serveur lors de la mise à jour de la liaison.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <h2>
          {mode === "edit"
            ? "Modifier la liaison Entreprise - Moto"
            : "Détails de la liaison"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="modal__group">
            <label>Entreprise :</label>
            {mode === "edit" ? (
              <select
                value={selectedCompanyId}
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                required
              >
                <option value="">-- Sélectionnez une entreprise --</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name || company.id}
                  </option>
                ))}
              </select>
            ) : (
              <div>
                {companies.find((c) => c.id === selectedCompanyId)?.name ||
                  selectedCompanyId}
              </div>
            )}
            {errors.companyId && <p className="error-message">{errors.companyId}</p>}
          </div>
          <div className="modal__group">
            <label>Moto :</label>
            {mode === "edit" ? (
              <select
                value={selectedMotorcycleId}
                onChange={(e) => setSelectedMotorcycleId(e.target.value)}
                required
              >
                <option value="">-- Sélectionnez une moto --</option>
                {motorcycles.map((moto) => (
                  <option key={moto.id} value={moto.id}>
                    {moto.model || moto.id}
                  </option>
                ))}
              </select>
            ) : (
              <div>
                {motorcycles.find((m) => m.id === selectedMotorcycleId)?.model ||
                  selectedMotorcycleId}
              </div>
            )}
            {errors.motorcycleId && <p className="error-message">{errors.motorcycleId}</p>}
          </div>
          <div className="modal__actions">
            {mode === "edit" ? (
              <>
                <button type="submit">Mettre à jour</button>
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

export default EditCompanyMotorcycleModal;
