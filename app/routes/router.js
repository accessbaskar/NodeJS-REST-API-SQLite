/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/user', require('./api/userRoutes'));
//router.use('/driver', require('./api/driverRoutes'));

module.exports = router;
