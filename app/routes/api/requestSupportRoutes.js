/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const RequestSupportController = require('../../controller/requestSupportController');
const requestSupportController = new RequestSupportController();

/**
 * Donate Entity routes
 */
router.get('/count', function (req, res) {
    requestSupportController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    requestSupportController.exists(req, res);
});

router.get('/:id', function (req, res) {
    requestSupportController.findById(req, res);
});

router.get('/', function (req, res) {
    requestSupportController.findAll(res);
});

router.put('/:id', function (req, res) {
    requestSupportController.update(req, res);
});

router.post('/create', function (req, res) {
    requestSupportController.create(req, res);
});

router.delete('/:id', function (req, res) {
    requestSupportController.deleteById(req, res);
});

module.exports = router;
