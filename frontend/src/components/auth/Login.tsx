import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, fetchUser } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store/store";
import { getApiUrl } from "../../config/apiUrls";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "../../styles/components/auth/login.scss";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resp = await fetch(`${getApiUrl()}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        toast.error(data.message || "Erreur inconnue lors de la connexion.");
        return;
      }

      toast.success("Connexion réussie !");
      dispatch(setToken(data.token));
      dispatch(fetchUser(data.token));
      navigate("/");
    } catch {
      toast.error("Erreur de connexion au serveur.");
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
            autoComplete="username"
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
