import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, fetchUser } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";
import { getApiUrl } from "../config/apiUrls";
import "../styles/pages/login.scss";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await fetch(`${getApiUrl()}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!resp.ok) {
      const err = await resp.json();
      alert("Erreur : " + err.error);
    } else {
      const data = await resp.json();
      dispatch(setToken(data.token));
      dispatch(fetchUser(data.token));
      alert(data.message);
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
            autoComplete="email"
          />
        </div>
        <div className="login__group">
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="login__button">
          Se connecter
        </button>
      </form>
      <button onClick={() => navigate("/")} className="login__back">
        Retour à l'accueil
      </button>
    </div>
  );
}

export default Login;
