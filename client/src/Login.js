import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css"

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      try {
          e.preventDefault(); 
          const response = await axios.post('http://localhost:3001/login', { username, password});
          alert(response.data.message);
          navigate(response.data.redirect);
      } catch (error) {
          alert(error.response.data.message || 'Login failed');
      }
  };

    return (
        <div className="login-div">
        <form className="login-form" onSubmit={handleLogin}>
      <div>
        <label className="login-label">Username:</label>
        <input
          type="text"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="login-label">Password:</label>
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="login-button" type="submit">Login</button>

      <p class="signup-link">
        No account?
        <a href="/register">Sign up</a>
      </p>
    </form>
    </div>
    );
}


