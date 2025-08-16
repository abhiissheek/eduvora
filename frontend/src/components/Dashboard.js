import React from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-title">Dashboard</h1>
          <div className="navbar-user">
            <span>Welcome, {currentUser?.name}</span>
            <button onClick={handleLogout} className="btn-danger">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="dashboard-card">
          <h2 className="dashboard-title">Welcome to your Dashboard!</h2>
          <div className="user-info">
            <h3 className="user-info-title">User Information</h3>
            <div className="user-info-grid">
              <div className="user-info-item">
                <dt>Name</dt>
                <dd>{currentUser?.name}</dd>
              </div>
              <div className="user-info-item">
                <dt>Email</dt>
                <dd>{currentUser?.email}</dd>
              </div>
              <div className="user-info-item">
                <dt>Role</dt>
                <dd>{currentUser?.role}</dd>
              </div>
              <div className="user-info-item">
                <dt>User ID</dt>
                <dd>{currentUser?._id}</dd>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
