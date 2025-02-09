import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getApiUrl } from "../../config/apiUrls";
import "../../styles/components/auth/Modal.scss";

// Définition des rôles et expériences
export type UserRole =
  | "ADMIN"
  | "MANAGER_COMPANY"
  | "MANAGER_CONCESSION"
  | "CLIENT"
  | "DRIVER";
export type UserExperience = "NOVICE" | "INTERMEDIATE" | "EXPERT";

// Props
interface SignUpModalProps {
  show: boolean;
  onClose: () => void;
  onUserCreated?: () => void;
  isAdmin?: boolean;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  show,
  onClose,
  onUserCreated,
  isAdmin = false,
}) => {
  // Champs communs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  // Rôle
  const [role, setRole] = useState<UserRole>(isAdmin ? "CLIENT" : "CLIENT");


  const [licenseExpiration, setLicenseExpiration] = useState("");
  const [licenseCountry, setLicenseCountry] = useState("");
  const [licenseNumber, setLicenseNumber] = useState(""); // passe en string

  // Pour CLIENT uniquement
  const [address, setAddress] = useState("");
  // Pour DRIVER uniquement
  const [experience, setExperience] = useState<UserExperience>("NOVICE");

  // Gestion des erreurs de validation locale (affichées à côté des champs)
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Réinitialiser les champs à l'ouverture de la modal
  useEffect(() => {
    if (show) {
      setEmail("");
      setPassword("");
      setNom("");
      setPrenom("");
      setLicenseExpiration("");
      setLicenseCountry("");
      setLicenseNumber("");
      setAddress("");
      setExperience("NOVICE");
      setRole(isAdmin ? "CLIENT" : "CLIENT");
      setErrors({});
    }
  }, [show, isAdmin]);

  // Détermine la liste des rôles disponibles
  const availableRoles: UserRole[] = isAdmin
    ? ["ADMIN", "MANAGER_COMPANY", "MANAGER_CONCESSION", "CLIENT", "DRIVER"]
    : ["CLIENT", "DRIVER"];

  // Handler du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = "L'email est requis";
    if (!password || password.length < 6)
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    if (!nom || nom.length < 2)
      newErrors.nom = "Le nom doit contenir au moins 2 caractères";
    if (!prenom || prenom.length < 2)
      newErrors.prenom = "Le prénom doit contenir au moins 2 caractères";

    // Pour CLIENT et DRIVER, on exige certains champs du permis
    if (role === "CLIENT" || role === "DRIVER") {
      if (!licenseExpiration)
        newErrors.licenseExpiration =
          "La date d'expiration du permis est requise";
      if (!licenseCountry)
        newErrors.licenseCountry = "Le pays du permis est requis";
      if (!licenseNumber)
        newErrors.licenseNumber = "Le numéro du permis est requis";
    }
    if (role === "CLIENT" && !address)
      newErrors.address = "L'adresse est requise pour un CLIENT";
    if (role === "DRIVER" && !experience)
      newErrors.experience = "L'expérience est requise pour un DRIVER";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Préparation du body selon le rôle sélectionné
    interface UserBody {
      email: string;
      password: string;
      nom: string;
      prenom: string;
      role: UserRole;
      licenseExpiration?: string;
      licenseCountry?: string;
      licenseNumber?: string;
      address?: string;
      experience?: UserExperience;
    }

    const body: UserBody = {
      email,
      password,
      nom,
      prenom,
      role,
      licenseExpiration:
        role === "CLIENT" || role === "DRIVER" ? licenseExpiration : undefined,
      licenseCountry:
        role === "CLIENT" || role === "DRIVER" ? licenseCountry : undefined,
      licenseNumber:
        role === "CLIENT" || role === "DRIVER" ? licenseNumber : undefined,
      address: role === "CLIENT" ? address : undefined,
      experience: role === "DRIVER" ? experience : undefined,
    };

    try {
      const resp = await fetch(`${getApiUrl()}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await resp.json();

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

      toast.success("Utilisateur créé avec succès !");
      onClose();
      if (onUserCreated) onUserCreated();
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
        <h2>Créer un nouvel utilisateur</h2>
        <form onSubmit={handleSubmit}>
          {/* Champs communs */}
          <div className="modal__group">
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="modal__group">
            <label>Mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <div className="modal__group">
            <label>Nom :</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
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
            />
            {errors.prenom && <p className="error-message">{errors.prenom}</p>}
          </div>
          {/* Sélection du rôle */}
          <div className="modal__group">
            <label>Rôle :</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              {availableRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.role && <p className="error-message">{errors.role}</p>}
          </div>

          {/* Pour CLIENT et DRIVER : champs pour le permis */}
          {(role === "CLIENT" || role === "DRIVER") && (
            <>
              <div className="modal__group">
                <label>Date d'expiration du permis :</label>
                <input
                  type="date"
                  value={licenseExpiration}
                  onChange={(e) => setLicenseExpiration(e.target.value)}
                  required
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
                />
                {errors.licenseNumber && (
                  <p className="error-message">{errors.licenseNumber}</p>
                )}
              </div>
            </>
          )}

          {role === "CLIENT" && (
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
          )}

          {role === "DRIVER" && (
            <div className="modal__group">
              <label>Expérience :</label>
              <select
                value={experience}
                onChange={(e) =>
                  setExperience(e.target.value as UserExperience)
                }
                required
              >
                <option value="NOVICE">NOVICE</option>
                <option value="INTERMEDIATE">INTERMEDIATE</option>
                <option value="EXPERT">EXPERT</option>
              </select>
              {errors.experience && (
                <p className="error-message">{errors.experience}</p>
              )}
            </div>
          )}

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

export default SignUpModal;
