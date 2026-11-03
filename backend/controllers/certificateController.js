const Certificate = require('../models/Certificate');

exports.getCertificates = async (req, res) => {
  try {
    const certificates = req.user.role === 'admin' 
      ? await Certificate.find().populate('studentId', 'name email')
      : await Certificate.find({ studentId: req.user.id });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create({ ...req.body, studentId: req.user.id });
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    
    if (certificate.studentId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Only allow updating if pending, or if admin
    if (certificate.verificationStatus !== 'Pending' && req.user.role !== 'admin') {
      return res.status(400).json({ message: 'Cannot update verified/rejected certificate' });
    }
    
    const updated = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    
    if (certificate.studentId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await certificate.deleteOne();
    res.json({ message: 'Certificate removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
