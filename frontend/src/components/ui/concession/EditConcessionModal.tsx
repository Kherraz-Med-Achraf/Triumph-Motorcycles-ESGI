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

export interface Concession {
  id: string;
  name: string;
  address: string;
  managerUserId?: string; // Utilisation de managerUserId pour refléter la colonne en base
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
  const [selectedUserId, setSelectedUserId] = useState(concession.managerUserId || "");
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lors de l'ouverture de la modal, on réinitialise les valeurs et on charge la liste des managers
  useEffect(() => {
    if (show) {
      setName(concession.name);
      setAddress(concession.address);
      setSelectedUserId(concession.managerUserId || "");
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
          
          const filteredUsers = data.filter(
            (user: User) => user.role === "MANAGER_CONCESSION"
          );
          setUsers(filteredUsers);
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des utilisateurs :", error);
          toast.error("Erreur lors du chargement des utilisateurs.");
        });
    }
  }, [show, concession, dispatch, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (mode === "view") {
      onClose();
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

      // On envoie le manager via managerUserId
      const body = { name, address, managerUserId: selectedUserId || null };

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

  // Recherche du manager associé dans la liste chargée
  const associatedUser = users.find((user) => user.id === selectedUserId);

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
              disabled={mode === "view"}
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="modal__group">
            <label>Adresse :</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={mode === "view"}
              required
            />
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>
          <div className="modal__group">
            <label>Manager associé :</label>
            {mode === "edit" ? (
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">-- Sélectionnez un manager --</option>
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
                  : "Aucun manager attribué"}
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

export default EditConcessionModal;
