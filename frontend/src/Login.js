import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi"; // Import Icons
import './App.css'; // Import the shared CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://127.0.0.1:5000/login', {
      email: email,      // Ensure these match your state names
      password: password
    });

    if (res.status === 200) {
      alert("Login Successful!");
      navigate('/'); // Go to home or dashboard
    }
  } catch (err) {
    // This is where your "Login Failed" popup comes from
    alert(err.response?.data?.error || "Login Failed");
  }
};

  return (
    <div className="auth-container">
      <h2>Staff Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        
        {/* Email Field Group */}
        <div className="input-group">
          <input 
            type="email" 
            placeholder="Enter Email" 
            className="auth-input"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <HiOutlineMail className="input-icon-right" />
        </div>

        {/* Password Field Group */}
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Enter Password" 
            className="auth-input"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <HiOutlineLockClosed className="input-icon-right" />
        </div>

        <button type="submit" className="auth-btn" style={{backgroundColor: '#28a745'}}>
          Sign In
        </button>
      </form>
      
      <p onClick={() => navigate('/register')} className="auth-link">
        Don't have an account? Register here
      </p>
    </div>
  );
};

export default Login;