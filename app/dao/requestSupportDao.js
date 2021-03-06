/* Load donate entity */
const RequestSupport = require('../model/requestSupport');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * donate Data Access Object
 */
class RequestSupportDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, name, eMailID, typeOfNeed, requestType, mobileNo, amount, details, address, createdOn, isApproved FROM requestSupport WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new RequestSupport(row.id, row.name, row.eMailID, row.typeOfNeed, row.requestType, row.mobileNo, row.amount, row.details, row.address, row.createdOn));

    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM requestSupport where isApproved=0 and approvedBy is null";
        return this.common.findAll(sqlRequest).then(rows => {
            let requestSupportCollection = [];
            for (const row of rows) {
                requestSupportCollection.push(new RequestSupport(row.id, row.name, row.eMailID, row.typeOfNeed, row.requestType, row.mobileNo, row.amount, row.details, row.address, row.createdOn));
            }
            return requestSupportCollection;
        });
    };


    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM requestSupport";
        return this.common.findOne(sqlRequest);
    };



    /**
     * Creates the given entity in the database
     * @params donate
     * returns database insertion status
     */
    create(requestSupport) {
        let sqlRequest = "INSERT into requestSupport (name, eMailID, typeOfNeed, requestType, mobileNo, amount, details, address, createdOn,isApproved,idImage) " +
            "VALUES ($name, $eMailID, $typeOfNeed, $requestType, $mobileNo, $amount, $details, $address, $createdOn,$isApproved,$idImage)";

        let sqlParams = {
            $name: requestSupport.name,
            $eMailID: requestSupport.eMailID,
            $typeOfNeed: requestSupport.typeOfNeed,
            $requestType: requestSupport.requestType,
            $mobileNo: requestSupport.mobileNo,
            $amount: requestSupport.amount,
            $address: requestSupport.address,
            $details: requestSupport.details,
            $createdOn: requestSupport.createdOn,
            $isApproved: '0',
            $idImage: requestSupport.idImage
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params donate
     * returns database insertion status
     */
    createWithId(requestSupport) {
        let sqlRequest = "INSERT into requestSupport (id,name, eMailID, typeOfNeed, requestType, mobileNo, amount, details, address, createdOn,idImage) " +
            "VALUES ($id,$name, $eMailID, $typeOfNeed, $requestType, $mobileNo, $amount, $details, $address, $createdOn,$idImage)";

        let sqlParams = {
            $name: requestSupport.name,
            $eMailID: requestSupport.eMailID,
            $typeOfNeed: requestSupport.typeOfNeed,
            $requestType: requestSupport.requestType,
            $mobileNo: requestSupport.mobileNo,
            $amount: requestSupport.amount,
            $address: requestSupport.address,
            $details: requestSupport.details,
            $createdOn: requestSupport.createdOn,
            $isApproved: '0',
            $idImage: requestSupport.idImage
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM requestSupport WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM requestSupport WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    update(requestSupport) {
        let sqlRequest = "UPDATE requestSupport SET " +
            // "name= $name, " +
            // "eMailID= $eMailID, " +
            // "typeOfNeed= $typeOfNeed, " +
            // "requestType= $requestType, " +
            // "mobileNo= $mobileNo, " +
            // "amount= $amount, " +
            // "address= $address, " +
            // "details= $details, " +
            // "createdOn= $createdOn, " +
            "isApproved= $isApproved " +
            "WHERE id=$id";

        let sqlParams = {
            $id: requestSupport.id,
            // $name: requestSupport.name,
            // $eMailID: requestSupport.eMailID,
            // $typeOfNeed: requestSupport.typeOfNeed,
            // $requestType: requestSupport.requestType,
            // $mobileNo: requestSupport.mobileNo,
            // $amount: requestSupport.amount,
            // $details: requestSupport.details,
            // $address: requestSupport.address,
            // $createdOn: requestSupport.createdOn,
            $isApproved: requestSupport.isApproved
        };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = RequestSupportDao;
