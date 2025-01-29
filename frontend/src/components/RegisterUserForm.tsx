// frontend/src/components/RegisterUserForm.tsx
import React, { useState } from 'react';

export function RegisterUserForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CLIENT'); // 'ADMIN', 'MANAGER_COMPANY', etc.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await fetch('http://localhost:3000/users/register', {
      // ou http://localhost:5000/users/register si on utilise Express
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    if (!resp.ok) {
      const err = await resp.json();
      alert('Error: ' + err.error);
    } else {
      const data = await resp.json();
      alert('Success: ' + data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register User</h2>
      <div>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER_COMPANY">MANAGER_COMPANY</option>
          <option value="MANAGER_CONCESSION">MANAGER_CONCESSION</option>
          <option value="CLIENT">CLIENT</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
