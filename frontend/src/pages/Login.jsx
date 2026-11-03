
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Form.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await login(email, password);

      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Login failed. Please check your email and password.'
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-wrapper">

        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-icon">◆</div>

          <h1>
            Cert<span>Verify</span>
          </h1>

          <p>
            Digital Certificate Verification Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="form-container">

          <div className="form-header">
            <p className="form-eyebrow">
              SECURE ACCESS
            </p>

            <h2>Welcome Back</h2>

            <p>
              Sign in to securely access your certificate portal.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="error-msg">
              <span className="error-icon">!</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="password-label-row">
                <label htmlFor="password">
                  Password
                </label>
              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="auth-submit"
            >
              <span>Sign In</span>
              <span className="submit-arrow">→</span>
            </button>

          </form>

          {/* Divider */}
          <div className="form-divider">
            <span>OR</span>
          </div>

          {/* Register */}
          <p className="form-footer">
            Don't have an account?{' '}
            <Link to="/register">
              Create an account
            </Link>
          </p>

        </div>

        {/* Security */}
        <div className="auth-security">
          <span className="security-icon">✓</span>
          <span>
            Your information is protected and securely handled.
          </span>
        </div>

      </div>
    </main>
  );
};

export default Login;
