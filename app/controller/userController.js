/* Load User Data Access Object */
const UserDao = require('../dao/userDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load User entity */
const User = require('../model/user');

const EmailClient = require('../utils/notification/email');

/**
 * User Controller
 */
class UserController {

    constructor() {
        this.userDao = new UserDao();
        this.common = new ControllerCommon();
        this.emailClient = new EmailClient();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.userDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.userDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * User Validation.
     * @return all entities
     */
    validateUser(req, res) {
        let user = new User();
        user.name = req.body.name;
        user.pwd = req.body.pwd;
        console.log('validate ');
        return this.userDao.validateUser(user)
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };
    validateOtpWithUser(req, res) {
        let user = new User();
        user.id = req.body.id;
        user.otp = req.body.otp;
        console.log('validateOtp ');
        return this.userDao.validateOtpWithUser(user)
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    }

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.userDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let user = new User();
        user.id = req.body.id;
        user.name = req.body.name;
        user.address = req.body.address;
        user.dob = req.body.dob;
        user.email = req.body.email;

        return this.userDao.update(user)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    updateOtp(req, res) {

        let user = new User();
        user.id = req.body.id;
        user.email = req.body.email;
        user.name = req.body.name;
        user.otp = Math.floor(100000 + Math.random() * 900000);


        return this.userDao.updateOtp(user)
            .then(this.common.editSuccess(res))
            .then(this.emailClient.sendEmail("OTP", user))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let user = new User();

        if (req.body.id) {
            user.id = req.body.id;
        }

        user.name = req.body.name;
        user.address = req.body.address;
        user.dob = req.body.dob;
        user.email = req.body.email;
        user.pwd = req.body.pwd;
        user.mobileno = req.body.mobileno;
        user.aboutUser = req.body.aboutUser;
        user.userType = req.body.userType;
        user.donarType = req.body.donarType;
        user.createdon = this.getDate();
        user.role = '';
        console.log('ID Image : ' + req.file.filename);
        user.idImage = req.file.filename;

        if (req.body.id) {
            return this.userDao.createWithId(user)
                .then(this.common.editSuccess(res))
                .then(this.emailClient.sendEmail("REGISTER", user))
                .catch(this.common.serverError(res));
        }
        else {
            return this.userDao.create(user)
                .then(this.common.editSuccess(res))
                .then(this.emailClient.sendEmail("REGISTER", user))
                .catch(this.common.serverError(res));
        }

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        this.userDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.userDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };

    getDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return yyyy + '-' + mm + '-' + dd;

    }
}

module.exports = UserController;
