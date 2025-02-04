import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getApiUrl } from "../../config/apiUrls";
import { toast } from "react-toastify";
import DataTable from "../ui/DataTable";
import "../../styles/components/dashboard/DashboardHome.scss";

const DashboardHome: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CLIENT");

  const [users, setUsers] = useState<any[]>([]);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    role?: string;
  }>({});

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

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Aucun token trouvé, accès refusé.");
        return;
      }

      const resp = await fetch(`${getApiUrl()}/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        setUsers(data);
      } else {
        toast.error("Erreur lors de la récupération des utilisateurs.");
      }
    } catch (error) {
      toast.error("Erreur serveur.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const resp = await fetch(`${getApiUrl()}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        console.log(data);
        if (data.errors) {
          setErrors({
            email: data.errors.email?._errors?.[0],
            password: data.errors.password?._errors?.[0],
            role: data.errors.role?._errors?.[0],
          });
        } else {
          toast.error(data.message);
        }
        return;
      }

      toast.success("Utilisateur créé avec succès !");
      setShowModal(false);
      setEmail("");
      setPassword("");
      setRole("CLIENT");
      setErrors({});

      fetchUsers();
    } catch (error) {
      toast.error("Erreur serveur.");
    }
  };

  return (
    <div className="dashboard__home">
      <h1>{message}</h1>

      <button
        onClick={() => setShowModal(true)}
        className="dashboard__home__create-user-btn"
      >
        Créer un nouvel utilisateur
      </button>

      {showModal && (
        <div className="modal">
          <div
            className="modal__overlay"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="modal__content">
            <h2>Créer un nouvel utilisateur</h2>
            <form onSubmit={handleCreateUser}>
              <div className="modal__group">
                <label>Email :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
              <div className="modal__group">
                <label>Mot de passe :</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>
              <div className="modal__group">
                <label>Rôle :</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER_COMPANY">MANAGER_COMPANY</option>
                  <option value="MANAGER_CONCESSION">MANAGER_CONCESSION</option>
                  <option value="CLIENT">CLIENT</option>
                  <option value="DRIVER">DRIVER</option>
                </select>
                {errors.role && <p className="error-message">{errors.role}</p>}
              </div>
              <div className="modal__actions">
                <button type="submit">Créer</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h2>Liste des utilisateurs</h2>
      <DataTable
        columns={[
          { id: "email", name: "Email" },
          { id: "role", name: "Rôle" },
          { id: "createdAt", name: "Date de création" },
        ]}
        data={users.map((user) => [
          user.email,
          user.role,
          new Date(user.createdAt).toLocaleDateString(),
        ])}
        search
        pagination
        sort
      />
    </div>
  );
};

export default DashboardHome;
