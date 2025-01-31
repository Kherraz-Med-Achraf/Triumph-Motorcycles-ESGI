import { useNavigate } from "react-router-dom";
import "../styles/pages/home.scss";
import logoImage from "../assets/logo.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img src={logoImage} alt="Triumph Logo" className="home__image" />
      <h1 className="home__logo">Triumph Motorcycles</h1>
      <div className="home__buttons">
        <button
          className="home__button home__button--login"
          onClick={() => navigate("/login")}
        >
          Connexion
        </button>
        <button
          className="home__button home__button--signup"
          onClick={() => navigate("/signup")} // Redirection vers /signup
        >
          Inscription
        </button>
      </div>
    </div>
  );
};

export default Home;
