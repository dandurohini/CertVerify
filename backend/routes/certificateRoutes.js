const express = require('express');
const router = express.Router();
const { getCertificates, addCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCertificates).post(protect, addCertificate);
router.route('/:id').put(protect, updateCertificate).delete(protect, deleteCertificate);

module.exports = router;
