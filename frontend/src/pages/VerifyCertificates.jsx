import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import './List.css';

const VerifyCertificates = () => {
  const [certs, setCerts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [remarks, setRemarks] = useState('');

  const fetchCerts = async () => {
    try {
      const { data } = await api.get('/certificates');
      setCerts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchCerts(); }, []);

  const handleVerify = async (status) => {
    try {
      await api.post('/verification', {
        certificateId: selectedCert._id,
        status,
        remarks
      });
      setSelectedCert(null);
      setRemarks('');
      fetchCerts();
    } catch (err) {
      alert('Error verifying certificate');
    }
  };

  const pendingCerts = certs.filter(c => c.verificationStatus === 'Pending');
  const filtered = pendingCerts.filter(c => 
    c.certificateTitle.toLowerCase().includes(search.toLowerCase()) ||
    c.certificateNumber.toLowerCase().includes(search.toLowerCase()) ||
    c.studentId?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list-container">
      <h2>Verify Certificates</h2>
      <input 
        type="text" 
        placeholder="Search pending certificates..." 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        className="search-bar"
      />
      <table className="table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Title</th>
            <th>Org</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c._id}>
              <td>{c.studentId?.name}</td>
              <td>{c.certificateTitle}</td>
              <td>{c.organization}</td>
              <td>{c.certificateNumber}</td>
              <td>
                <button onClick={() => setSelectedCert(c)} className="btn btn-sm btn-primary">Review</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <p>No pending certificates.</p>}

      {selectedCert && (
        <div className="modal">
          <div className="modal-content">
            <h3>Review Certificate</h3>
            <p><strong>Title:</strong> {selectedCert.certificateTitle}</p>
            <p><strong>Student:</strong> {selectedCert.studentId?.name}</p>
            <p><strong>Number:</strong> {selectedCert.certificateNumber}</p>
            <p><strong>Organization:</strong> {selectedCert.organization}</p>
            <p><strong>Issue Date:</strong> {new Date(selectedCert.issueDate).toLocaleDateString()}</p>
            <div className="form-group" style={{marginTop:'1rem'}}>
              <label>Remarks</label>
              <textarea value={remarks} onChange={e=>setRemarks(e.target.value)} rows="3"></textarea>
            </div>
            <div style={{display:'flex', gap:'1rem', marginTop:'1rem'}}>
              <button onClick={() => handleVerify('Verified')} className="btn btn-success">Verify</button>
              <button onClick={() => handleVerify('Rejected')} className="btn btn-danger">Reject</button>
              <button onClick={() => setSelectedCert(null)} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificates;
