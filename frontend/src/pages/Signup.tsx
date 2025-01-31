import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/signup.scss"; 

export function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CLIENT");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    if (!resp.ok) {
      const err = await resp.json();
      alert("Erreur : " + err.error);
    } else {
      const data = await resp.json();
      alert("Succès : " + data.message);
      navigate("/");
    }
  };

  return (
    <div className="signup">
      <h2 className="signup__title">Créer un compte</h2>
      <form onSubmit={handleSubmit} className="signup__form">
        <div className="signup__group">
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup__group">
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup__group">
          <label>Rôle :</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER_COMPANY">MANAGER_COMPANY</option>
            <option value="MANAGER_CONCESSION">MANAGER_CONCESSION</option>
            <option value="CLIENT">CLIENT</option>
          </select>
        </div>
        <button type="submit" className="signup__button">S'inscrire</button>
      </form>
      <button onClick={() => navigate("/")} className="signup__back">
        Retour à l'accueil
      </button>
    </div>
  );
}

export default Signup;
