import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Sending request to your Flask backend /register endpoint
      const res = await axios.post('http://127.0.0.1:5000/register', {
        username: username,
        email: email,
        password: password
      });

      if (res.status === 201 || res.status === 200) {
        alert("Registration Successful!");
        // After registering, send them to the login page
        navigate('/login');
      }
    } catch (err) {
      // Handle email already exists or other backend errors
      alert(err.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Staff Registration</h2>
      <form onSubmit={handleRegister} style={formStyle}>
        <input 
          type="text" 
          placeholder="Full Name" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={inputStyle} 
          required 
        />
        <input 
          type="email" 
          placeholder="Enter Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={inputStyle} 
          required 
        />
        <input 
          type="password" 
          placeholder="Create Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={inputStyle} 
          required 
        />
        <button type="submit" style={btnStyle}>Create Account</button>
      </form>
      <p onClick={() => navigate('/login')} style={{cursor: 'pointer', color: 'blue'}}>
        Already have an account? Login here
      </p>
    </div>
  );
};

// Keeping styles identical for a consistent look
const containerStyle = { textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' };
const formStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' };
const inputStyle = { padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' };
const btnStyle = { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default Register;