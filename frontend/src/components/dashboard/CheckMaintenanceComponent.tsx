import React, { useState } from "react";
import { getApiUrl } from "../../config/apiUrls";
import { toast } from "react-toastify";
import "../../styles/components/dashboard/CheckMaintenanceComponent.scss";

const CheckMaintenanceComponent: React.FC = () => {
  
  const [vin, setVin] = useState("");
  const [motorcycleId, setMotorcycleId] = useState("");
  const [intervalType, setIntervalType] = useState("");

  
  const [inputValue, setInputValue] = useState("");

  
  const [maintenanceDue, setMaintenanceDue] = useState<boolean | null>(null);
  const [maintenanceMessage, setMaintenanceMessage] = useState("");

 
  const [checking, setChecking] = useState(false);
  const [maintenanceChecked, setMaintenanceChecked] = useState(false);


  const fetchMotorcycleByVin = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("Aucun token trouvé.");
      return;
    }
    try {
      const resp = await fetch(`${getApiUrl()}/motorcycles/vin/${vin}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp.ok) {
        throw new Error("Moto introuvable avec ce VIN.");
      }
      const data = await resp.json();
      setMotorcycleId(data.id);
      setIntervalType(data.intervalType); 
      toast.success(`Moto trouvée. Type d'intervalle: ${data.intervalType}`);
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la récupération de la moto.");
    }
  };

  
  const handleCheckMaintenance = async () => {
    if (!motorcycleId) {
      toast.error("Veuillez d'abord rechercher la moto par son VIN.");
      return;
    }
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("Aucun token trouvé.");
      return;
    }
    if (!inputValue) {
      toast.error(
        intervalType === "KM"
          ? "Veuillez entrer le kilométrage actuel."
          : "Veuillez entrer la date actuelle."
      );
      return;
    }
    setChecking(true);
    try {
      let url = `${getApiUrl()}/motorcycles/${motorcycleId}/check-maintenance?`;
      if (intervalType === "KM") {
        url += `currentMileage=${inputValue}`;
      } else if (intervalType === "TIME") {
        url += `currentDate=${inputValue}`;
      } else {
        toast.error("Type d'intervalle inconnu.");
        setChecking(false);
        return;
      }
      const resp = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp.ok) {
        throw new Error("Erreur lors de la vérification de la maintenance.");
      }
      const result = await resp.json();
      setMaintenanceDue(result.due);
      setMaintenanceMessage(result.message);
      setMaintenanceChecked(true);
      toast.info(result.message);
    } catch (error: any) {
      toast.error(
        error.message || "Erreur lors de la vérification de la maintenance."
      );
    }
    setChecking(false);
  };

 
  const handlePerformMaintenance = async () => {
    if (!motorcycleId) {
      toast.error("ID de moto manquant.");
      return;
    }
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("Aucun token trouvé.");
      return;
    }
    try {
      
      let payload: any = {};
      if (intervalType === "KM") {
      
        payload = { currentMileage: Number(inputValue) };
      } else if (intervalType === "TIME") {
      
        payload = { currentDate: inputValue };
      }
      const resp = await fetch(
        `${getApiUrl()}/motorcycles/${motorcycleId}/maintenance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!resp.ok) {
        throw new Error("Erreur lors de l'exécution de la maintenance.");
      }
      const data = await resp.json();
      toast.success(data.message || "Maintenance effectuée.");
      setMaintenanceDue(null);
      setMaintenanceMessage("");
      setMaintenanceChecked(false);
      setInputValue("");
    } catch (error: any) {
      toast.error(
        error.message || "Erreur lors de l'exécution de la maintenance."
      );
    }
  };

  return (
    <div className="check-maintenance-component">
      <h3>Vérifier la maintenance d'une moto</h3>


      <div className="modal__group">
        <label>VIN de la moto :</label>
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="Entrez le VIN"
        />
        <button onClick={fetchMotorcycleByVin}>Rechercher la moto</button>
      </div>


      {motorcycleId && (
        <div className="modal__group">
          <p>
            <strong>Type d'intervalle :</strong> {intervalType}
          </p>
          {intervalType === "KM" && (
            <div>
              <label>Kilométrage actuel :</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Entrez le kilométrage actuel"
              />
            </div>
          )}
          {intervalType === "TIME" && (
            <div>
              <label>Date actuelle :</label>
              <input
                type="date"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          )}
          <button onClick={handleCheckMaintenance} disabled={checking}>
            {checking ? "Vérification en cours..." : "Vérifier la maintenance"}
          </button>
        </div>
      )}


      {maintenanceChecked && (
        <div className="modal__group">
          <p>{maintenanceMessage}</p>
          {maintenanceDue && (
            <button onClick={handlePerformMaintenance}>
              Maintenance effectuée
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckMaintenanceComponent;
