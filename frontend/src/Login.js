import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sending request to your Flask backend
      const res = await axios.post('http://127.0.0.1:5000/login', {
        email: email,
        password: password
      });

      if (res.status === 200) {
        alert("Login Successful!");
        // You can save the token here in the future
        console.log("Token:", res.data.token);
        
        // Redirect to a dashboard or back to Home
        navigate('/');
      }
    } catch (err) {
      // Handle wrong password or user not found
      alert(err.response?.data?.error || "Login Failed");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Staff Login</h2>
      <form onSubmit={handleLogin} style={formStyle}>
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
          placeholder="Enter Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={inputStyle} 
          required 
        />
        <button type="submit" style={btnStyle}>Sign In</button>
      </form>
      <p onClick={() => navigate('/register')} style={{cursor: 'pointer', color: 'blue'}}>
        Don't have an account? Register here
      </p>
    </div>
  );
};

// Simple Styles
const containerStyle = { textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' };
const formStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' };
const inputStyle = { padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' };
const btnStyle = { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default Login;