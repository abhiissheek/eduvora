import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login({ email, password });
    
    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Sign in to your account</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-input"
              placeholder="Email address"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          <div className="auth-link">
            <p>
              Don't have an account?{' '}
              <Link to="/register">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
