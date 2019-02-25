/* Load Donate Data Access Object */
const RequestSupportDao = require('../dao/requestSupportDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load User entity */
const RequestSupport = require('../model/requestSupport');

/**
 * Donate Controller
 */
class RequestSupportController {

    constructor() {
        this.requestSupportDao = new RequestSupportDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.requestSupportDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.requestSupportDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.requestSupportDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let requestSupport = new RequestSupport();
        //id, name, eMailID, typeOfNeed, requestType, mobileNo, amount, details, address, createdOn

        requestSupport.id = req.body.id;
        requestSupport.name = req.body.name;
        requestSupport.eMailID = req.body.eMailID;
        requestSupport.typeOfNeed=req.body.typeOfNeed;
        requestSupport.requestType=req.body.requestType;
        requestSupport.mobileNo = parseInt(req.body.mobileNo);
        requestSupport.amount = req.body.amount;
        requestSupport.details=req.body.details;
        requestSupport.address=req.body.address;
        requestSupport.createdOn = this.getDate();
        

        return this.requestSupportDao.update(user)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        
        
        let requestSupport = new RequestSupport();
        if (req.body.id) {
            requestSupport.id = req.body.id;
        }
        
         
        requestSupport.id = req.body.id;
        requestSupport.name = req.body.name;
        requestSupport.eMailID = req.body.eMailID;
        requestSupport.typeOfNeed=req.body.typeOfNeed;
        requestSupport.requestType=req.body.requestType;
        requestSupport.mobileNo = parseInt(req.body.mobileNo);
        requestSupport.amount = req.body.amount;
        requestSupport.details=req.body.details;
        requestSupport.address=req.body.address;
        requestSupport.createdOn = this.getDate();
        
        if (req.body.id) {
            return this.requestSupportDao.createWithId(requestSupport)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.requestSupportDao.create(requestSupport)
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

        this.requestSupportDao.deleteById(id)
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

        this.requestSupportDao.exists(id)
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

module.exports = RequestSupportController;
