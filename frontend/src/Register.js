import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi"; 
import './App.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post('http://127.0.0.1:5000/register', {
        username: username,
        email: email,
        password: password
      });

      if (res.status === 201 || res.status === 200) {
        alert("Registration Successful!");
        navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Staff Registration</h2>
      <form onSubmit={handleRegister} className="auth-form">
        
        {/* Full Name Field */}
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="auth-input"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <HiOutlineUser className="input-icon-right" />
        </div>

        {/* Email Field */}
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

        {/* Password Field */}
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Create Password" 
            className="auth-input"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <HiOutlineLockClosed className="input-icon-right" />
        </div>

        <button type="submit" className="auth-btn">Create Account</button>
      </form>
      
      <p onClick={() => navigate('/login')} className="auth-link">
        Already have an account? Login here
      </p>
    </div>
  );
}; // This closing bracket must be BEFORE the export

export default Register;