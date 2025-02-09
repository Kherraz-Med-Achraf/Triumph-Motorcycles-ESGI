import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getApiUrl } from "../../config/apiUrls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

import "../../styles/components/auth/Modal.scss";

interface User {
  id: string;
  nom: string;
  prenom: string;
  role: string;
}

interface CreateCompanyModalProps {
  show: boolean;
  onClose: () => void;
  onCompanyCreated?: () => void;
}

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  show,
  onClose,
  onCompanyCreated,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(""); 
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setName("");
      setAddress("");
      setSelectedUserId("");
      setErrors({});
    }
  }, [show]);

  useEffect(() => {
    if (show) {
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
  }, [show, dispatch, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: { [key: string]: string } = {};
    if (!name || name.length < 2)
      newErrors.name =
        "Le nom de l'entreprise doit contenir au moins 2 caractères";
    if (!address || address.length < 5)
      newErrors.address = "L'adresse doit contenir au moins 5 caractères";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const body = {
      name,
      address,
      userId: selectedUserId || null,
    };

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        dispatch(logout());
        navigate("/");
        return;
      }

      const resp = await fetch(`${getApiUrl()}/companies/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await resp.json();
      console.log(resp);

      if (!resp.ok) {
        if (data.errors) {
          const backendErrors: { [key: string]: string } = {};
          Object.keys(data.errors).forEach((field) => {
            backendErrors[field] =
              data.errors[field]?._errors?.[0] || data.errors[field];
          });
          setErrors(backendErrors);
        } else {
          toast.error(
            data.message || "Erreur lors de la création de l'utilisateur"
          );
        }
        return;
      }

      toast.success("Entreprise créée avec succès !");
      onClose();
      if (onCompanyCreated) onCompanyCreated();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Erreur serveur. ${error.message}`);
      } else {
        toast.error("Erreur serveur inconnue.");
      }
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <h2>Créer une entreprise</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal__group">
            <label>Nom de l'entreprise :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              required
            />
            {errors.address && (
              <p className="error-message">{errors.address}</p>
            )}
          </div>
          <div className="modal__group">
            <label>Utilisateur associé :</label>
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
            {errors.userId && <p className="error-message">{errors.userId}</p>}
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

export default CreateCompanyModal;
