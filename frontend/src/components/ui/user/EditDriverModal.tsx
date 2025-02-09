import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getApiUrl } from "../../../config/apiUrls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/slices/authSlice";
import "../../../styles/components/auth/Modal.scss";

export type DriverExperience = "NOVICE" | "INTERMEDIATE" | "EXPERT";

export interface DriverUser {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
  experience?: string;
  licenseExpiration?: string;
  licenseCountry?: string;
  licenseNumber?: string;
  companyId?: string;
  companyMotorcycleId?: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  address: string;
}

export interface CompanyMotorcycle {
  id: string;
  companyId: string;
  motorcycleId: string;
  assignedAt: string;
  createdAt: string;
}

export interface Motorcycle {
  id: string;
  model: string;
}

interface EditDriverModalProps {
  show: boolean;
  onClose: () => void;
  driverId: string;
  onDriverUpdated: () => void;
  mode?: "edit" | "view";
  motorcycles: Motorcycle[];
}

const EditDriverModal: React.FC<EditDriverModalProps> = ({
  show,
  onClose,
  driverId,
  onDriverUpdated,
  mode = "edit",
  motorcycles,
}) => {
  const [driver, setDriver] = useState<DriverUser | null>(null);

  // États pour les champs du driver
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [licenseExpiration, setLicenseExpiration] = useState("");
  const [licenseCountry, setLicenseCountry] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  // Nouveaux champs pour l'association
  const [companyId, setCompanyId] = useState("");
  const [companyMotorcycleId, setCompanyMotorcycleId] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Listes récupérées
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyMotorcycles, setCompanyMotorcycles] = useState<CompanyMotorcycle[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lorsque la modal s'ouvre, récupérer les détails complets du driver
  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          toast.error("Aucun token trouvé, accès refusé.");
          return;
        }
        const resp = await fetch(`${getApiUrl()}/users/${driverId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!resp.ok) {
          toast.error("Erreur lors de la récupération des détails du driver.");
          return;
        }
        const fullDriverData = await resp.json();
        // Fusionner les données principales et celles du sous-objet driver (si présent)
        const merged = { ...fullDriverData, ...(fullDriverData.driver || {}) };
        setDriver(merged);
        setEmail(merged.email);
        setNom(merged.nom);
        setPrenom(merged.prenom);
        setRole(merged.role);
        setExperience(merged.experience || "");
        setLicenseExpiration(
          merged.licenseExpiration ? merged.licenseExpiration.substring(0, 10) : ""
        );
        setLicenseCountry(merged.licenseCountry || "");
        setLicenseNumber(merged.licenseNumber || "");
        setCompanyId(merged.companyId || "");
        setCompanyMotorcycleId(merged.companyMotorcycleId || "");
        setErrors({});
      } catch (error) {
        console.error("Erreur serveur lors de la récupération des détails du driver:", error);
        toast.error("Erreur serveur.");
      }
    };

    if (show && driverId) {
      fetchDriverDetails();
    }
  }, [show, driverId]);

  // Récupérer la liste des entreprises
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          toast.error("Aucun token trouvé, accès refusé.");
          dispatch(logout());
          navigate("/");
          return;
        }
        const resp = await fetch(`${getApiUrl()}/companies`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!resp.ok) {
          toast.error("Erreur lors de la récupération des entreprises.");
          return;
        }
        const data = await resp.json();
        setCompanies(data);
      } catch (error) {
        console.error("Erreur serveur:", error);
        toast.error("Erreur serveur lors de la récupération des entreprises.");
      }
    };
    fetchCompanies();
  }, [dispatch, navigate]);

  // Récupérer la liste des company-motorcycles
  useEffect(() => {
    const fetchCompanyMotorcycles = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          toast.error("Aucun token trouvé, accès refusé.");
          dispatch(logout());
          navigate("/");
          return;
        }
        const resp = await fetch(`${getApiUrl()}/company-motorcycles`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!resp.ok) {
          toast.error("Erreur lors de la récupération des motos d'entreprise.");
          return;
        }
        const data = await resp.json();
        setCompanyMotorcycles(data);
      } catch (error) {
        console.error("Erreur serveur:", error);
        toast.error("Erreur serveur lors de la récupération des motos d'entreprise.");
      }
    };
    fetchCompanyMotorcycles();
  }, [dispatch, navigate]);


  const filteredCompanyMotorcycles = companyId
    ? companyMotorcycles.filter((cm) => cm.companyId === companyId)
    : companyMotorcycles;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "view") return;
    setErrors({});

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
    if (!experience) {
      setErrors({ experience: "L'expérience est requise pour un DRIVER" });
      return;
    }
    if (!licenseExpiration) {
      setErrors({ licenseExpiration: "La date d'expiration du permis est requise" });
      return;
    }
    if (!licenseCountry) {
      setErrors({ licenseCountry: "Le pays du permis est requis" });
      return;
    }
    if (!licenseNumber) {
      setErrors({ licenseNumber: "Le numéro du permis est requis" });
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
      const payload: any = {
        email,
        nom,
        prenom,
        role,
        experience,
        licenseExpiration,
        licenseCountry,
        licenseNumber,
      };
      payload.companyId = companyId;
      payload.companyMotorcycleId = companyMotorcycleId;
      console.log("Payload:", payload);
      const resp = await fetch(`${getApiUrl()}/users/${driverId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        toast.error("Erreur lors de la modification du driver.");
        return;
      }
      toast.success("Driver mis à jour avec succès !");
      onClose();
      onDriverUpdated();
    } catch (error) {
      toast.error("Erreur serveur.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <h2>{mode === "edit" ? "Modifier le driver" : "Détails du driver"}</h2>
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
            <input type="text" value={role} disabled />
          </div>
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
          {/* Champs pour l'association */}
          <div className="modal__group">
            <label>Company :</label>
            <select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              disabled={mode === "view"}
            >
              <option value="">-- Sélectionnez une company --</option>
              {companies.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal__group">
            <label>Moto :</label>
            <select
              value={companyMotorcycleId}
              onChange={(e) => setCompanyMotorcycleId(e.target.value)}
              disabled={mode === "view"}
            >
              <option value="">-- Sélectionnez une moto --</option>
              {filteredCompanyMotorcycles.map((cm) => {
                const moto = motorcycles.find((m) => m.id === cm.motorcycleId);
                return (
                  <option key={cm.id} value={cm.id}>
                    {moto ? moto.model : "Inconnu"}
                  </option>
                );
              })}
            </select>
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

export default EditDriverModal;
