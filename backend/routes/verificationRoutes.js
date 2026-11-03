const express = require('express');
const router = express.Router();
const { getVerifications, addVerification, updateVerification, deleteVerification } = require('../controllers/verificationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getVerifications).post(protect, admin, addVerification);
router.route('/:id').put(protect, admin, updateVerification).delete(protect, admin, deleteVerification);

module.exports = router;
