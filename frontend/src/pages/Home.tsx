// src/pages/Home.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchUser, logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Landing from "../components/Landing";
import "../styles/pages/home.scss";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token))
        .unwrap()
        .then(() => {
          navigate("/dashboard");
        })
        .catch(() => {
          dispatch(logout());
        });
    }
  }, [dispatch, token, navigate]);

  if (!token) {
    return <Landing />;
  }

  return (
    <div className="home">
      <p>Vérification du token...</p>
    </div>
  );
};

export default Home;
