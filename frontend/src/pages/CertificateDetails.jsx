import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import './Dashboard.css';

const CertificateDetails = () => {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [verifications, setVerifications] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data: certData } = await api.get('/certificates');
        const found = certData.find(c => c._id === id);
        setCert(found);

        // Fetch verifications to find remarks
        const { data: verData } = await api.get('/verification').catch(() => ({data: []}));
        const related = verData.filter(v => v.certificateId?._id === id || v.certificateId === id);
        setVerifications(related);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetails();
  }, [id]);

  if (!cert) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h2>Certificate Details</h2>
      <div className="card" style={{textAlign:'left', maxWidth:'600px', margin:'0 auto'}}>
        <p><strong>Title:</strong> {cert.certificateTitle}</p>
        <p><strong>Type:</strong> {cert.certificateType}</p>
        <p><strong>Organization:</strong> {cert.organization}</p>
        <p><strong>Certificate Number:</strong> {cert.certificateNumber}</p>
        <p><strong>Issue Date:</strong> {new Date(cert.issueDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> <span className={`status ${cert.verificationStatus.toLowerCase()}`}>{cert.verificationStatus}</span></p>

        {verifications.length > 0 && (
          <div style={{marginTop:'2rem', borderTop:'1px solid #ccc', paddingTop:'1rem'}}>
            <h3>Verification History</h3>
            {verifications.map(v => (
              <div key={v._id} style={{marginBottom:'1rem', padding:'1rem', background:'#eef'}}>
                <p><strong>Date:</strong> {new Date(v.verificationDate).toLocaleString()}</p>
                <p><strong>Verified By:</strong> {v.verifiedBy?.name}</p>
                <p><strong>Remarks:</strong> {v.remarks || 'None'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateDetails;
