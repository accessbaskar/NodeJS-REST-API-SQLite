/* Load modules */
const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");

/* Database configuration */
const database = require('./app/config/dbconfig');

/* Init database */
database.init();

/* Init server listening */
const port = process.argv[2] || 5555;
app.listen(port, function () {
    console.log("Server listening on port : " + port);
});

/* Express configuration */
app.use('/uploaded_images', express.static('uploaded_images'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/* Router configuration */
const REST_API_ROOT = '/api';
app.use(REST_API_ROOT, require('./app/routes/router'));
