import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getApiUrl } from "../../../config/apiUrls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/slices/authSlice";

interface Concession {
  id: string;
  name: string;
  address: string;
  // Vous pouvez ajouter d'autres champs si nécessaire (ex: createdAt)
}

interface EditConcessionModalProps {
  show: boolean;
  onClose: () => void;
  concession: Concession;
  onConcessionUpdated: () => void;
  mode?: "edit" | "view";
}

const EditConcessionModal: React.FC<EditConcessionModalProps> = ({
  show,
  onClose,
  concession,
  onConcessionUpdated,
  mode = "edit",
}) => {
  const [name, setName] = useState(concession.name);
  const [address, setAddress] = useState(concession.address);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      // Réinitialisation des champs lors de l'ouverture de la modal
      setName(concession.name);
      setAddress(concession.address);
      setErrors({});
    }
  }, [show, concession]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // En mode "view", on se contente de fermer la modale
    if (mode === "view") {
      return;
    }

    setErrors({});

    // Vérifications simples
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

      const body = { name, address };

      const resp = await fetch(`${getApiUrl()}/concessions/${concession.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        toast.error("Erreur lors de la modification de la concession.");
        return;
      }

      toast.success("Concession mise à jour avec succès !");
      onClose();
      onConcessionUpdated();
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur serveur.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <h2>
          {mode === "edit"
            ? "Modifier la concession"
            : "Détails de la concession"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="modal__group">
            <label>Nom de la concession :</label>
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

export default EditConcessionModal;
