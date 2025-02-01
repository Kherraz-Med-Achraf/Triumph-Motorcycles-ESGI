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
        <button
          className="landing__button landing__button--signup"
          onClick={() => navigate("/signup")} 
        >
          Inscription
        </button>
      </div>
    </div>
  );
};

export default Landing;
