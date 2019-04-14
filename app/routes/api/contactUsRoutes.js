/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ContactUsController = require('../../controller/contactUsController');
const contactUsController = new ContactUsController();

/**
 * Donate Entity routes
 */
router.get('/count', function (req, res) {
    contactUsController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    contactUsController.exists(req, res);
});

router.get('/:id', function (req, res) {
    contactUsController.findById(req, res);
});

router.get('/', function (req, res) {
    contactUsController.findAll(res);
});

router.put('/:id', function (req, res) {
    contactUsController.update(req, res);
});

router.post('/create', function (req, res) {
    contactUsController.create(req, res);
});

router.delete('/:id', function (req, res) {
    contactUsController.deleteById(req, res);
});

module.exports = router;
