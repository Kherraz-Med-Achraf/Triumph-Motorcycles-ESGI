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
    experience?: string;
    licenseExpiration?: string;
    licenseCountry?: string;
    licenseNumber?: string;
  };
  onUserUpdated: () => void;
  mode?: "edit" | "view";
}

interface Company {
  id: string;
  name: string;
  address: string;
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

  // Champs spécifiques pour DRIVER
  const [experience, setExperience] = useState(user.experience || "");
  const [licenseExpiration, setLicenseExpiration] = useState(
    user.licenseExpiration || ""
  );
  const [licenseCountry, setLicenseCountry] = useState(
    user.licenseCountry || ""
  );
  const [licenseNumber, setLicenseNumber] = useState(user.licenseNumber || "");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

 
  const [company, setCompany] = useState<Company | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (show) {
      setEmail(user.email);
      setNom(user.nom);
      setPrenom(user.prenom);
      setRole(user.role);
      setAddress(user.address || "");
      setExperience(user.experience || "");
      setLicenseExpiration(user.licenseExpiration || "");
      setLicenseCountry(user.licenseCountry || "");
      setLicenseNumber(user.licenseNumber || "");
      setErrors({});
    }
  }, [show, user]);

  
  useEffect(() => {
    if (show && role === "MANAGER_COMPANY") {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        dispatch(logout());
        navigate("/");
        return;
      }
      fetch(`${getApiUrl()}/companies/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            return null;
          }
          return resp.json();
        })
        .then((data) => {
          setCompany(data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération de l'entreprise du manager :",
            error
          );
          setCompany(null);
        });
    } else {
      setCompany(null);
    }
  }, [show, role, user.id, dispatch, navigate]);

  // Si le rôle est DRIVER, charger les données spécifiques du driver via l'endpoint GET /users/:id
  useEffect(() => {
    async function loadDriverData() {
      if (show && role === "DRIVER") {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          toast.error("Aucun token trouvé, accès refusé.");
          dispatch(logout());
          navigate("/");
          return;
        }
        try {
          const resp = await fetch(`${getApiUrl()}/users/${user.id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!resp.ok) {
            toast.error("Erreur lors du chargement des données du driver.");
            return;
          }
          const data = await resp.json();
          
          if (data.driver) {
            setExperience(data.driver.experience || "");
            
            setLicenseExpiration(
              data.driver.licenseExpiration
                ? data.driver.licenseExpiration.substring(0, 10)
                : ""
            );
            setLicenseCountry(data.driver.licenseCountry || "");
            setLicenseNumber(data.driver.licenseNumber || "");
          }
        } catch (error) {
          toast.error("Erreur serveur lors du chargement des données.");
        }
      }
    }
    loadDriverData();
  }, [show, role, user.id, dispatch, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "view") return;
    setErrors({});

    // Validations communes
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

   
    if (role === "CLIENT") {
      if (!address) {
        setErrors({ address: "L'adresse est requise pour un CLIENT" });
        return;
      }
    }

   
    if (role === "DRIVER") {
      if (!experience) {
        setErrors({ experience: "L'expérience est requise pour un DRIVER" });
        return;
      }
      if (!licenseExpiration) {
        setErrors({
          licenseExpiration: "La date d'expiration du permis est requise",
        });
        return;
      }
      if (!licenseCountry) {
        setErrors({
          licenseCountry: "Le pays du permis est requis",
        });
        return;
      }
      if (!licenseNumber) {
        setErrors({
          licenseNumber: "Le numéro du permis est requis",
        });
        return;
      }
    }

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        dispatch(logout());
        navigate("/");
        return;
      }

      // Préparation du payload
      const payload: any = { email, nom, prenom, role };
      if (role === "CLIENT") {
        payload.address = address;
      }
      if (role === "DRIVER") {
        payload.experience = experience;
        payload.licenseExpiration = licenseExpiration;
        payload.licenseCountry = licenseCountry;
        payload.licenseNumber = licenseNumber;
      }

      const resp = await fetch(`${getApiUrl()}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
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
            {/* Le rôle est affiché en lecture seule */}
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              disabled
            />
          </div>
          {role === "CLIENT" && (
            <div className="modal__group">
              <label>Adresse :</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={mode === "view"}
              />
              {errors.address && (
                <p className="error-message">{errors.address}</p>
              )}
            </div>
          )}
          {role === "DRIVER" && (
            <>
              <div className="modal__group">
                <label>Expérience :</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                  disabled={mode === "view"}
                >
                  <option value="">-- Sélectionnez une expérience --</option>
                  <option value="NOVICE">NOVICE</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="EXPERT">EXPERT</option>
                </select>
                {errors.experience && (
                  <p className="error-message">{errors.experience}</p>
                )}
              </div>
              <div className="modal__group">
                <label>Date d'expiration du permis :</label>
                <input
                  type="date"
                  value={licenseExpiration}
                  onChange={(e) => setLicenseExpiration(e.target.value)}
                  required
                  disabled={mode === "view"}
                />
                {errors.licenseExpiration && (
                  <p className="error-message">{errors.licenseExpiration}</p>
                )}
              </div>
              <div className="modal__group">
                <label>Pays du permis :</label>
                <input
                  type="text"
                  value={licenseCountry}
                  onChange={(e) => setLicenseCountry(e.target.value)}
                  required
                  disabled={mode === "view"}
                />
                {errors.licenseCountry && (
                  <p className="error-message">{errors.licenseCountry}</p>
                )}
              </div>
              <div className="modal__group">
                <label>Numéro du permis :</label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required
                  disabled={mode === "view"}
                />
                {errors.licenseNumber && (
                  <p className="error-message">{errors.licenseNumber}</p>
                )}
              </div>
            </>
          )}
          {role === "MANAGER_COMPANY" && (
            <div className="modal__group">
              <label>Entreprise associée :</label>
              {company ? (
                <div>
                  {company.name} - {company.address}
                </div>
              ) : (
                <div>Aucune entreprise attribuée</div>
              )}
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
