import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getApiUrl } from "../../../config/apiUrls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/slices/authSlice";

interface EditCompanyModalProps {
  show: boolean;
  onClose: () => void;
  company: { id: string; name: string; address: string };
  onCompanyUpdated: () => void;
  mode?: "edit" | "view";
}

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  show,
  onClose,
  company,
  onCompanyUpdated,
  mode = "edit",
}) => {
  const [name, setName] = useState(company.name);
  const [address, setAddress] = useState(company.address);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setName(company.name);
      setAddress(company.address);
      setErrors({});
    }
  }, [show, company]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "view") {
      return;
    }

    setErrors({});

    if (!name || name.length < 2) {
      setErrors({ name: "Le nom doit contenir au moins 2 caractères" });
      return;
    }
    if (!address || address.length < 5) {
      setErrors({ address: "L'adresse doit contenir au moins 5 caractères" });
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        dispatch(logout());
        navigate("/");
        return;
      }

      const resp = await fetch(`${getApiUrl()}/companies/${company.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, address }),
      });

      if (!resp.ok) {
        toast.error("Erreur lors de la modification de l'entreprise.");
        return;
      }

      toast.success("Entreprise mise à jour avec succès !");
      onClose();
      onCompanyUpdated();
    } catch (error) {
      toast.error("Erreur serveur.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <h2>
          {mode === "edit" ? "Modifier l'entreprise" : "Détails de l'entreprise"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="modal__group">
            <label>Nom de l'entreprise :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={mode === "view"}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="modal__group">
            <label>Adresse :</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled={mode === "view"}
            />
            {errors.address && <p className="error-message">{errors.address}</p>}
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

export default EditCompanyModal;
