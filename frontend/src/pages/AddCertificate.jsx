import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const AddCertificate = () => {
  const [formData, setFormData] = useState({
    certificateTitle: '', certificateType: '', organization: '', issueDate: '', certificateNumber: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/certificates', formData);
      navigate('/my-certificates');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding certificate');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Certificate</h2>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Certificate Title</label>
          <input type="text" name="certificateTitle" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Certificate Type</label>
          <input type="text" name="certificateType" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Organization</label>
          <input type="text" name="organization" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Issue Date</label>
          <input type="date" name="issueDate" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Certificate Number</label>
          <input type="text" name="certificateNumber" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddCertificate;
