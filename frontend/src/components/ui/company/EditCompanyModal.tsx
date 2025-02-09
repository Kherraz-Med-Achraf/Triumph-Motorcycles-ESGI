import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getApiUrl } from "../../../config/apiUrls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/slices/authSlice";

interface User {
  id: string;
  nom: string;
  prenom: string;
  role: string;
}

interface Company {
  id: string;
  name: string;
  address: string;
  userId?: string;
}

interface EditCompanyModalProps {
  show: boolean;
  onClose: () => void;
  company: Company;
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
  const [selectedUserId, setSelectedUserId] = useState(company.userId || "");
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      
      setName(company.name);
      setAddress(company.address);
      setSelectedUserId(company.userId || "");
      setErrors({});

      
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        dispatch(logout());
        navigate("/");
        return;
      }
      fetch(`${getApiUrl()}/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
         
          const filteredUsers = data.filter((user: User) => user.role === "MANAGER_COMPANY");
          setUsers(filteredUsers);
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des utilisateurs :", error);
          toast.error("Erreur lors du chargement des utilisateurs.");
        });
    }
  }, [show, company, dispatch, navigate]);

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

      // On inclut également le userId dans la requête pour mettre à jour l'utilisateur associé
      const body = { name, address, userId: selectedUserId || null };

      const resp = await fetch(`${getApiUrl()}/companies/${company.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
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

  // En mode view, retrouver l'utilisateur associé pour afficher son nom complet
  const associatedUser = users.find((user) => user.id === selectedUserId);

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
          <div className="modal__group">
            <label>Utilisateur associé :</label>
            {mode === "edit" ? (
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">-- Sélectionnez un utilisateur --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.prenom} {user.nom}
                  </option>
                ))}
              </select>
            ) : (
              <div className="associated-user">
                {associatedUser
                  ? `${associatedUser.prenom} ${associatedUser.nom}`
                  : "Aucun utilisateur associé"}
              </div>
            )}
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
