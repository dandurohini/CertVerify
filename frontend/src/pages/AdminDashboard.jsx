import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import './Dashboard.css';

const AdminDashboard = () => {
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

  if (loading) return <div>Loading...</div>;

  const pending = certs.filter(c => c.verificationStatus === 'Pending').length;
  const verified = certs.filter(c => c.verificationStatus === 'Verified').length;
  const rejected = certs.filter(c => c.verificationStatus === 'Rejected').length;

  // Rough estimate of total students by unique studentId
  const studentsCount = new Set(certs.map(c => c.studentId?._id)).size;

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="summary-cards">
        <div className="card"><h3>Total Certificates</h3><p>{certs.length}</p></div>
        <div className="card"><h3>Total Students (w/ certs)</h3><p>{studentsCount}</p></div>
        <div className="card pending"><h3>Pending</h3><p>{pending}</p></div>
        <div className="card verified"><h3>Verified</h3><p>{verified}</p></div>
        <div className="card rejected"><h3>Rejected</h3><p>{rejected}</p></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
