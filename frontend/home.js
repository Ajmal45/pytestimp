import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>API Testing Page</h1>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/register')} style={btnStyle}>Register</button>
        <button onClick={() => navigate('/login')} style={btnStyle}>Login</button>
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '10px 20px',
  margin: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px'
};

export default Home;