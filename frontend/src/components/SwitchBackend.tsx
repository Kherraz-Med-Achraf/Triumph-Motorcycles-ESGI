import React, { useState, useEffect } from "react";
import "../styles/components/SwitchBackend.scss";

export function SwitchBackend() {
  const [open, setOpen] = useState(false);
  const [selectedBackend, setSelectedBackend] = useState<string | null>(null);

  useEffect(() => {
    const storedBackend = localStorage.getItem("backend");
    if (storedBackend === "NEST" || storedBackend === "EXPRESS") {
      setSelectedBackend(storedBackend);
    }
  }, []);

  const handleSwitch = (backend: "NEST" | "EXPRESS") => {
    localStorage.setItem("backend", backend);
    setSelectedBackend(backend);
    window.location.reload();
  };

  return (
    <div className={`switch-backend ${open ? "open" : ""}`}>
      <button className="switch-toggle" onClick={() => setOpen(!open)}>
        <span className="material-symbols-outlined">settings</span>
      </button>
      <div className="switch-content">
        <p>Choisissez le backend :</p>
        <button
          className={`backend-button ${selectedBackend === "NEST" ? "selected" : "unselected"}`}
          onClick={() => handleSwitch("NEST")}
        >
          Nest.js
        </button>
        <button
          className={`backend-button ${selectedBackend === "EXPRESS" ? "selected" : "unselected"}`}
          onClick={() => handleSwitch("EXPRESS")}
        >
          Express.js
        </button>
      </div>
    </div>
  );
}

export default SwitchBackend;
