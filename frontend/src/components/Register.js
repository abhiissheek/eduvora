import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    const result = await register({ name, email, password });
    
    if (result.success) {
      toast.success('Registration successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Create your account</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              id="name"
              name="name"
              type="text"
              required
              className="form-input"
              placeholder="Full Name"
              value={name}
              onChange={onChange}
            />
          </div>
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
              required
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="form-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
          <div className="auth-link">
            <p>
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
