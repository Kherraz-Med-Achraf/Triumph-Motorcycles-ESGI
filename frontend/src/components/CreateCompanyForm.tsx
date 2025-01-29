// frontend/src/components/CreateCompanyForm.tsx
import React, { useState } from 'react';

export function CreateCompanyForm() {
  const [name, setName] = useState('');
  const [managerUserId, setManagerUserId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await fetch('http://localhost:3000/companies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, managerUserId }),
    });
    if (!resp.ok) {
      const err = await resp.json();
      alert('Error: ' + err.error);
    } else {
      const data = await resp.json();
      alert('Created: ' + data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Company</h2>
      <label>Name: </label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Manager User Id: </label>
      <input value={managerUserId} onChange={(e) => setManagerUserId(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}
