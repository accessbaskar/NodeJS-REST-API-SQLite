/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const RequestSupportController = require('../../controller/requestSupportController');
const requestSupportController = new RequestSupportController();

const multer = require('multer');
const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploaded_images/support/");
    },
    filename: function (req, file, callback) {
        callback(null, randomNr() + "_" + file.originalname);
    }
});
//Returns a random integer between min (inclusive) and max (inclusive)
const randomNr = () => {
    return Math.floor(Math.random() * (9999999999999 - 1 + 1)) + 1;
}

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: Storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


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

router.post('/update', function (req, res) {
    console.log(req.body);
    requestSupportController.update(req, res);
});

router.post('/create', upload.single("uploadImage"), function (req, res) {
    requestSupportController.create(req, res);
});

router.delete('/:id', function (req, res) {
    requestSupportController.deleteById(req, res);
});

module.exports = router;
