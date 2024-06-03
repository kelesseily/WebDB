import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./admin.css";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newRole, setNewRole] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3001/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const updateUserRole = async () => {
        try {
            await axios.put(`http://localhost:3001/users/${selectedUserId}`, { role: newRole });
            fetchUsers(); 
            setSelectedUserId(null); 
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Admin Page</h2>
            <div className="admin-buttons">
                <Link to="/admin/form" className="admin-button">Go to Form</Link>
                <Link to="/admin/query" className="admin-button">Go to Query</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>
                                {selectedUserId === user._id ? (
                                    <select
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                    >
                                        <option value="">Select new role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Query employee">Query Employee</option>
                                        <option value="Data entry representative">Data Entry Representative</option>
                                    </select>
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td>
                                <button
                                    className="form-button-update"
                                    onClick={() => setSelectedUserId(user._id)}
                                >
                                    Update Role
                                </button>
                                <button className="form-button" onClick={() => deleteUser(user._id)}>Delete</button>
                                {selectedUserId === user._id && (
                                    <button className="form-button" onClick={updateUserRole}>Save</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


