/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/user', require('./api/userRoutes'));
router.use('/donate', require('./api/donateRoutes'));
router.use('/request-support', require('./api/requestSupportRoutes'));
router.use('/upload', require('./api/uploadRoutes'));
//router.use('/driver', require('./api/driverRoutes'));

module.exports = router;
