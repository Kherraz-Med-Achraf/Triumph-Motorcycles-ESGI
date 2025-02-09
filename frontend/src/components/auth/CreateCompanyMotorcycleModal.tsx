import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getApiUrl } from "../../config/apiUrls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import "../../styles/components/auth/Modal.scss";

interface Company {
  id: string;
  name: string;
}

interface Motorcycle {
  id: string;
  model: string;
}

interface CreateCompanyMotorcycleModalProps {
  show: boolean;
  onClose: () => void;
  onLiaisonCreated?: () => void;
  companies: Company[];
  motorcycles: Motorcycle[];
}

const CreateCompanyMotorcycleModal: React.FC<CreateCompanyMotorcycleModalProps> = ({
  show,
  onClose,
  onLiaisonCreated,
  companies,
  motorcycles,
}) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedMotorcycleId, setSelectedMotorcycleId] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setSelectedCompanyId("");
      setSelectedMotorcycleId("");
      setErrors({});
    }
  }, [show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const resp = await fetch(`${getApiUrl()}/company-motorcycles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.message || "Erreur lors de la création de la liaison.");
        return;
      }
      toast.success("Liaison créée avec succès !");
      onClose();
      if (onLiaisonCreated) onLiaisonCreated();
    } catch (error) {
      console.error("Erreur serveur:", error);
      toast.error("Erreur serveur lors de la création de la liaison.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <h2>Créer une liaison Entreprise - Moto</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal__group">
            <label>Entreprise :</label>
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
            {errors.companyId && <p className="error-message">{errors.companyId}</p>}
          </div>
          <div className="modal__group">
            <label>Moto :</label>
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
            {errors.motorcycleId && <p className="error-message">{errors.motorcycleId}</p>}
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

export default CreateCompanyMotorcycleModal;
