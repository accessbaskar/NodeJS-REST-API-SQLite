/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const DonateController = require('../../controller/donateController');
const donateController = new DonateController();

/**
 * Donate Entity routes
 */
router.get('/count', function (req, res) {
    donateController.countAll(res);
});

router.get('/getsum', function (req, res) {
    donateController.getSumOfDonation(res);
});

router.get('/exists/:id', function (req, res) {
    donateController.exists(req, res);
});

router.get('/:id', function (req, res) {
    donateController.findById(req, res);
});

router.get('/', function (req, res) {
    donateController.findAll(res);
});

router.put('/:id', function (req, res) {
    donateController.update(req, res);
});

router.post('/create', function (req, res) {
    donateController.create(req, res);
});

router.delete('/:id', function (req, res) {
    donateController.deleteById(req, res);
});

module.exports = router;
