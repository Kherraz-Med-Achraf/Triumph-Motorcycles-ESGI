import { useNavigate } from "react-router-dom";
import "../styles/components/Landing.scss";
import logoImage from "../assets/logo.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <img src={logoImage} alt="Triumph Logo" className="landing__image" />
      <h1 className="landing__logo">Triumph Motorcycles</h1>
      <div className="landing__buttons">
        <button
          className="landing__button landing__button--login"
          onClick={() => navigate("/login")}
        >
          Connexion
        </button>
      </div>
      <h2>
        Si vous n'avez pas de compte, contactez l'administrateur à cette adresse :{" "}
        <a href="mailto:admin@gg.fr">admin@gg.fr</a>
      </h2>
    </div>
  );
};

export default Landing;
