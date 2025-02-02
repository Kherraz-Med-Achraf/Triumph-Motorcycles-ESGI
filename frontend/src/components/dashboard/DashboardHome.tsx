import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; 
const DashboardHome: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  let message = "Bienvenue dans le tableau de bord";
  if (user) {
    switch (user.role) {
      case "ADMIN":
        message = "Bienvenue dans le tableau de bord de l'administrateur";
        break;
      case "MANAGER_COMPANY":
        message = "Bienvenue dans le tableau de bord du manager de la company";
        break;
      case "MANAGER_CONCESSION":
        message =
          "Bienvenue dans le tableau de bord du manager de la concession";
        break;
      case "CLIENT":
        message = "Bienvenue dans le tableau de bord Client";
        break;
      case "DRIVER":
        message = "Bienvenue dans le tableau de bord Driver";
        break;
      default:
        message = "Bienvenue dans le tableau de bord";
        break;
    }
  }

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default DashboardHome;
