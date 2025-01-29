import { Routes, Route, Link } from 'react-router-dom';
import { RegisterUserForm } from './components/RegisterUserForm';
import { CreateCompanyForm } from './components/CreateCompanyForm';
import './App.css';

function App() {
  return (
    <div>
      <nav>
        <h1>Moto Store</h1>
        <Link to="/">Home</Link> | 
        <Link to="/register">Register</Link> | 
        <Link to="/create-company">Create Company</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Bienvenue dans Moto Store !</h2>} />
        <Route path="/register" element={<RegisterUserForm />} />
        <Route path="/create-company" element={<CreateCompanyForm />} />
      </Routes>
    </div>
  );
}

export default App;
