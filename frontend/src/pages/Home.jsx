
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <main className="home-container">

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            <span>✦</span>
            Trusted Digital Verification
          </div>

          <h1>
            Your Certificates.
            <br />
            <span>Verified with Confidence.</span>
          </h1>

          <p className="hero-description">
            A secure digital platform designed to store, manage,
            and verify academic and professional certificates with ease.
          </p>

          <div className="home-links">
            <Link
              to="/register"
              className="btn btn-primary"
            >
              Get Started
              <span>→</span>
            </Link>

            <Link
              to="/login"
              className="btn btn-secondary"
            >
              Login
            </Link>
          </div>

          <div className="trust-points">
            <div>
              <span>✓</span>
              Secure
            </div>

            <div>
              <span>✓</span>
              Easy to Manage
            </div>

            <div>
              <span>✓</span>
              Fast Verification
            </div>
          </div>

        </div>

        <div className="hero-visual">

          <div className="certificate-card">

            <div className="certificate-top">
              <span className="certificate-mark">
                ◆
              </span>

              <span className="verified-label">
                VERIFIED
              </span>
            </div>

            <div className="certificate-line"></div>

            <p className="certificate-label">
              DIGITAL CERTIFICATE
            </p>

            <h3>
              Certificate of Achievement
            </h3>

            <p className="certificate-text">
              This certificate has been digitally issued
              and securely verified.
            </p>

            <div className="certificate-footer">

              <div>
                <small>STATUS</small>

                <strong>
                  ✓ Verified
                </strong>
              </div>

              <div className="seal">
                ✓
              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="features-section">

        <div className="feature">

          <div className="feature-icon">
            ⌁
          </div>

          <h3>
            Secure Storage
          </h3>

          <p>
            Keep your certificates organized in one
            secure digital platform.
          </p>

        </div>

        <div className="feature">

          <div className="feature-icon">
            ✓
          </div>

          <h3>
            Easy Verification
          </h3>

          <p>
            Admins can quickly review and verify
            submitted certificates.
          </p>

        </div>

        <div className="feature">

          <div className="feature-icon">
            ◇
          </div>

          <h3>
            Digital Access
          </h3>

          <p>
            Access your certificate records whenever
            you need them.
          </p>

        </div>

      </section>

    </main>
  );
};

export default Home;