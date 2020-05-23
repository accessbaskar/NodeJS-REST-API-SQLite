/* Load Donate Data Access Object */
const DonateDao = require('../dao/donateDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load User entity */
const Donate = require('../model/donate');
const EmailClient = require('../utils/notification/email');
/**
 * Donate Controller
 */
class DonateController {

    constructor() {
        this.donateDao = new DonateDao();
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

        this.donateDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.donateDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.donateDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };
    getSumOfDonation(res) {
        this.donateDao.getSum()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    }
    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let donate = new Donate();


        donate.id = req.body.id;
        donate.name = req.body.name;
        donate.eMailID = req.body.eMailID;
        donate.mobileNo = parseInt(req.body.mobileNo);
        donate.amount = req.body.amount;
        donate.createdOn = this.getDate();
        donate.status = req.body.status;

        return this.donateDao.update(user)
            .then(this.common.editSuccess(res))
            .then(this.emailClient.sendEmail("DONATE", donate))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {


        let donate = new Donate();
        if (req.body.id) {
            donate.id = req.body.id;
        }
        console.log('Type is ' + typeof req.body.mobileNo + ' value is ' + req.body.mobileNo);

        donate.id = req.body.id;
        donate.name = req.body.name;
        donate.eMailID = req.body.eMailID;
        donate.mobileNo = req.body.mobileNo;
        donate.amount = req.body.amount;
        donate.createdOn = this.getDate();
        donate.status = req.body.status;

        if (req.body.id) {
            return this.donateDao.createWithId(donate)
                .then(this.common.editSuccess(res))
               
                .catch(this.common.serverError(res));
        }
        else {
            return this.donateDao.create(donate)
                .then(this.common.editSuccess(res))
              
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

        this.donateDao.deleteById(id)
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

        this.donateDao.exists(id)
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

module.exports = DonateController;
