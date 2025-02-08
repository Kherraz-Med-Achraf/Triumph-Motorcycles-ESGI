import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getApiUrl } from "../../../config/apiUrls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/slices/authSlice";

interface EditUserModalProps {
  show: boolean;
  onClose: () => void;
  user: {
    id: string;
    email: string;
    nom: string;
    prenom: string;
    role: string;
    address?: string;
  };
  onUserUpdated: () => void;
  mode?: "edit" | "view";
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  show,
  onClose,
  user,
  onUserUpdated,
  mode = "edit",
}) => {
  const [email, setEmail] = useState(user.email);
  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prenom);
  const [role, setRole] = useState(user.role);
  const [address, setAddress] = useState(user.address || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setEmail(user.email);
      setNom(user.nom);
      setPrenom(user.prenom);
      setRole(user.role);
      setAddress(user.address || "");
      setErrors({});
    }
  }, [show, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "view") {
      return;
    }
    setErrors({});

    // Quelques validations de base
    if (!email) {
      setErrors({ email: "L'email est requis" });
      return;
    }
    if (!nom || nom.length < 2) {
      setErrors({ nom: "Le nom doit contenir au moins 2 caractères" });
      return;
    }
    if (!prenom || prenom.length < 2) {
      setErrors({ prenom: "Le prénom doit contenir au moins 2 caractères" });
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
      const resp = await fetch(`${getApiUrl()}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, nom, prenom, role, address }),
      });
      if (!resp.ok) {
        toast.error("Erreur lors de la modification de l'utilisateur.");
        return;
      }
      toast.success("Utilisateur mis à jour avec succès !");
      onClose();
      onUserUpdated();
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
          {mode === "edit"
            ? "Modifier l'utilisateur"
            : "Détails de l'utilisateur"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="modal__group">
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={mode === "view"}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="modal__group">
            <label>Nom :</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              disabled={mode === "view"}
            />
            {errors.nom && <p className="error-message">{errors.nom}</p>}
          </div>
          <div className="modal__group">
            <label>Prénom :</label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
              disabled={mode === "view"}
            />
            {errors.prenom && <p className="error-message">{errors.prenom}</p>}
          </div>
          <div className="modal__group">
            <label>Rôle :</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              disabled={mode === "view"}
            />
          </div>
          {/* Afficher le champ Adresse uniquement pour CLIENT ou DRIVER */}
          {(role === "CLIENT" || role === "DRIVER") && (
            <div className="modal__group">
              <label>Adresse :</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={mode === "view"}
              />
            </div>
          )}
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

export default EditUserModal;
