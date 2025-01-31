import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login.scss"; 

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!resp.ok) {
      const err = await resp.json();
      alert("Erreur : " + err.error);
    } else {
      const data = await resp.json();
      alert("Connexion réussie : " + data.message);
      navigate("/"); 
    }
  };

  return (
    <div className="login">
      <h2 className="login__title">Connexion</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="login__group">
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login__group">
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login__button">Se connecter</button>
      </form>
      <button onClick={() => navigate("/")} className="login__back">
        Retour à l'accueil
      </button>
    </div>
  );
}

export default Login;
