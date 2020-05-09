/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const UserController = require('../../controller/userController');
const userController = new UserController();

const EmailClient = require('../../utils/notification/email');
const emailClient = new EmailClient();

const multer = require('multer');
const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploaded_images/");
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
 * Car Entity routes
 */
router.get('/count', function (req, res) {
    userController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    userController.exists(req, res);
});

router.get('/:id', function (req, res) {
    userController.findById(req, res);
});

router.get('/', function (req, res) {
    userController.findAll(res);
});

router.put('/:id', function (req, res) {
    userController.update(req, res);
});

router.post('/create', upload.single("uploadImage"), function (req, res) {
    userController.create(req, res);
});

router.post('/validateUser', function (req, res) {
    console.log(req.body.name);
    userController.validateUser(req, res);    
});
router.post('/sendOtp',  function (req, res) {   
    userController.updateOtp(req,res)
});

router.post('/validateOtpWithUser', function (req, res) {
    console.log(req.body.name);
    userController.validateOtpWithUser(req, res);    
});

router.delete('/:id', function (req, res) {
    userController.deleteById(req, res);
});

module.exports = router;
