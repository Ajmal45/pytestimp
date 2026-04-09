import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/register', { email, password });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Register Staff</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required /><br/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required /><br/>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Register;