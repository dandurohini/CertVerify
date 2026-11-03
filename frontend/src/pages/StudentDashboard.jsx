
import React, {
  useEffect,
  useState,
  useContext
} from 'react';

import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);

  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const { data } = await api.get('/certificates');
        setCerts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCerts();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const pending = certs.filter(
    c => c.verificationStatus === 'Pending'
  ).length;

  const verified = certs.filter(
    c => c.verificationStatus === 'Verified'
  ).length;

  const rejected = certs.filter(
    c => c.verificationStatus === 'Rejected'
  ).length;

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <p className="dashboard-eyebrow">
            STUDENT PORTAL
          </p>

          <h2>
            Welcome back, {user?.name || 'Student'}.
          </h2>

          <p className="dashboard-subtitle">
            Here's an overview of your digital certificates.
          </p>

        </div>

        <div className="dashboard-badge">
          <span>●</span>
          Account Active
        </div>

      </div>

      <div className="summary-cards">

        <div className="card total-card">

          <div className="card-icon">
            ▣
          </div>

          <div>
            <p>Total Certificates</p>
            <h3>{certs.length}</h3>
          </div>

        </div>

        <div className="card pending">

          <div className="card-icon">
            ◷
          </div>

          <div>
            <p>Pending</p>
            <h3>{pending}</h3>
          </div>

        </div>

        <div className="card verified">

          <div className="card-icon">
            ✓
          </div>

          <div>
            <p>Verified</p>
            <h3>{verified}</h3>
          </div>

        </div>

        <div className="card rejected">

          <div className="card-icon">
            ×
          </div>

          <div>
            <p>Rejected</p>
            <h3>{rejected}</h3>
          </div>

        </div>

      </div>

      <section className="recent-section">

        <div className="section-heading">

          <div>

            <p className="section-eyebrow">
              CERTIFICATE RECORDS
            </p>

            <h3>
              Recent Certificates
            </h3>

          </div>

          <span className="certificate-count">
            {certs.length}{' '}
            {certs.length === 1
              ? 'Certificate'
              : 'Certificates'}
          </span>

        </div>

        {certs.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              ◇
            </div>

            <h4>
              No certificates yet
            </h4>

            <p>
              Your submitted certificates will appear here.
            </p>

          </div>

        ) : (

          <ul className="certificate-list">

            {certs.slice(0, 5).map(c => (

              <li
                key={c._id}
                className="certificate-item"
              >

                <div className="certificate-info">

                  <div className="certificate-icon">
                    ▤
                  </div>

                  <div>

                    <h4>
                      {c.certificateTitle}
                    </h4>

                    <p>
                      Digital certificate record
                    </p>

                  </div>

                </div>

                <span
                  className={`status ${c.verificationStatus.toLowerCase()}`}
                >
                  <span>●</span>
                  {c.verificationStatus}
                </span>

              </li>

            ))}

          </ul>

        )}

      </section>

    </div>
  );
};

export default StudentDashboard;