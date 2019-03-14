/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const UploadController = require('../../controller/uploadController');
const uploadController = new UploadController();

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

router.post('/', upload.single("uploadImage"), function (req, res) {
    uploadController.upload(req, res);
    console.log('FileName : ' + req.file.filename);
});

module.exports = router;
