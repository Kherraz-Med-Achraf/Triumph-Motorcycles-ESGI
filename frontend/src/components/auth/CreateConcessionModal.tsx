import React, { useState } from "react";
import { toast } from "react-toastify";
import { getApiUrl } from "../../config/apiUrls";

type CreateConcessionModalProps = {
  show: boolean;
  onClose: () => void;
  onConcessionCreated: () => void;
};

const CreateConcessionModal: React.FC<CreateConcessionModalProps> = ({ show, onClose, onConcessionCreated }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("Aucun token trouvé, accès refusé.");
      return;
    }

    try {
      const resp = await fetch(`${getApiUrl()}/concessions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, address }),
      });

      if (!resp.ok) {
        toast.error("Erreur lors de la création de la concession.");
        return;
      }

      toast.success("Concession créée avec succès.");
      onConcessionCreated();
      onClose();
      setName("");
      setAddress("");
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur serveur.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Créer une concession</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Adresse</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
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

export default CreateConcessionModal;
