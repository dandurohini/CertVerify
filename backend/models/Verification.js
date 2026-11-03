const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  certificateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate', required: true },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  verificationDate: { type: Date, default: Date.now },
  remarks: { type: String }
});

module.exports = mongoose.model('Verification', verificationSchema);
