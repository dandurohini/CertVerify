const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  certificateTitle: { type: String, required: true },
  certificateType: { type: String, required: true },
  organization: { type: String, required: true },
  issueDate: { type: Date, required: true },
  certificateNumber: { type: String, required: true, unique: true },
  verificationStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
