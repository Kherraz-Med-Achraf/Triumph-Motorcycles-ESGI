import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import { fetchUser, logout } from "../store/slices/authSlice";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (!storedToken) {
      dispatch(logout());
      setLoading(false);
      return;
    }
    
    if (token && !user) {
      dispatch(fetchUser(token))
        .unwrap()
        .catch(() => {
          dispatch(logout());
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [location, token, user, dispatch]);


  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
