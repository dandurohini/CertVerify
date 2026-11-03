import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import './List.css';

const MyCertificates = () => {
  const [certs, setCerts] = useState([]);
  const [search, setSearch] = useState('');

  const fetchCerts = async () => {
    try {
      const { data } = await api.get('/certificates');
      setCerts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchCerts(); }, []);

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await api.delete(`/certificates/${id}`);
        fetchCerts();
      } catch (err) {
        alert('Error deleting certificate');
      }
    }
  };

  const filtered = certs.filter(c => 
    c.certificateTitle.toLowerCase().includes(search.toLowerCase()) ||
    c.certificateType.toLowerCase().includes(search.toLowerCase()) ||
    c.organization.toLowerCase().includes(search.toLowerCase()) ||
    c.certificateNumber.toLowerCase().includes(search.toLowerCase()) ||
    c.verificationStatus.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list-container">
      <h2>My Certificates</h2>
      <input 
        type="text" 
        placeholder="Search certificates..." 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        className="search-bar"
      />
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Organization</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c._id}>
              <td>{c.certificateTitle}</td>
              <td>{c.certificateType}</td>
              <td>{c.organization}</td>
              <td><span className={`status ${c.verificationStatus.toLowerCase()}`}>{c.verificationStatus}</span></td>
              <td>
                <Link to={`/certificates/${c._id}`} className="btn btn-sm btn-info">View</Link>
                {c.verificationStatus === 'Pending' && (
                  <button onClick={() => handleDelete(c._id)} className="btn btn-sm btn-danger" style={{marginLeft:'5px'}}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <p>No certificates found.</p>}
    </div>
  );
};

export default MyCertificates;
