import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/role')
            .then(response => {
                setRole(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the roles!', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/register', {
                username,
                password,
                role
            });
            alert('User registered successfully');
            navigate('/login');
        } catch (error) {
            console.error('There was an error registering!', error);
            alert('Registration failed');
        }
    };


    return (
        <div className="login-div">
            <form className="login-form" onSubmit={handleSubmit}>
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
                <div className="role-group">
                    <label className="login-label">Role:</label>
                    <div className="role-option">
                        <input
                            type="radio"
                            id="admin"
                            name="role"
                            value="Admin"
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor="admin">Admin</label>
                    </div>
                    <div className="role-option">
                        <input
                            type="radio"
                            id="queryEmployee"
                            name="role"
                            value="Query employee"
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor="queryEmployee">Query Employee</label>
                    </div>
                    <div className="role-option">
                        <input
                            type="radio"
                            id="dataEntryRep"
                            name="role"
                            value="Data entry representative"
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor="dataEntryRep">Data Entry Representative</label>
                    </div>
                </div>
                <button className="login-button" type="submit">Sign up</button>

                <p className="signup-link">
                    Already have an account?
                    <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
}


