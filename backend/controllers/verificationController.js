const Verification = require('../models/Verification');
const Certificate = require('../models/Certificate');

exports.getVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find().populate('certificateId verifiedBy', 'name email certificateTitle');
    res.json(verifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addVerification = async (req, res) => {
  const { certificateId, status, remarks } = req.body;
  try {
    const certificate = await Certificate.findById(certificateId);
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });

    certificate.verificationStatus = status;
    await certificate.save();

    const verification = await Verification.create({
      certificateId,
      verifiedBy: req.user.id,
      remarks
    });

    res.status(201).json(verification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVerification = async (req, res) => {
  try {
    const verification = await Verification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(verification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVerification = async (req, res) => {
  try {
    await Verification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Verification removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
