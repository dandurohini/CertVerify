
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Form.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const user = await register(name, email, password, role);

      setSuccess('Registration successful! Opening your portal...');

      const userRole = user?.role || role;

      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/admin-dashboard', { replace: true });
        } else {
          navigate('/student-dashboard', { replace: true });
        }
      }, 1200);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-card">

        <div className="register-logo">◆</div>

        <h1 className="register-title">
          Cert<span>Verify</span>
        </h1>

        <p className="register-subtitle">
          Create your student account
        </p>

        {success && (
          <div className="register-success" role="status">
            <span className="register-success-icon">✓</span>
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="register-error" role="alert">
            <span>!</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="register-group">
            <label htmlFor="register-name">Full Name</label>
            <input
              id="register-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
              disabled={loading || !!success}
            />
          </div>

          <div className="register-group">
            <label htmlFor="register-email">Email Address</label>
            <input
              id="register-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              disabled={loading || !!success}
            />
          </div>

          <div className="register-group">
            <label htmlFor="register-password">Password</label>

            <div className="password-input-wrapper">
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                disabled={loading || !!success}
              />

              <button
                type="button"
                className="password-eye-button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                disabled={loading || !!success}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                    <path d="M9.9 5.2A11 11 0 0112 5c5 0 8.5 4.5 9.5 7a11 11 0 01-3 4.2" />
                    <path d="M6.2 6.2A13 13 0 002.5 12c1 2.5 4.5 7 9.5 7 1.5 0 2.8-.4 4-1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="register-group">
            <label htmlFor="register-role">Account Type</label>
            <select
              id="register-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading || !!success}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={loading || !!success}
          >
            {loading
              ? 'Creating Account...'
              : success
                ? 'Registration Successful ✓'
                : 'Register'}
          </button>
        </form>

        <div className="register-divider"></div>

        <p className="register-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>

      </div>
    </main>
  );
};

export default Register;
