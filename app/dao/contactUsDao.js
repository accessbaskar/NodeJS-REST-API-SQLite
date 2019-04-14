/* Load Contactus entity */
const ContactUs = require('../model/contactus');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * donate Data Access Object
 */
class ContactUsDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, name, eMailID, mobileNo, details, createdOn FROM contactus WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new ContactUs(row.id, row.name, row.eMailID, row.mobileNo,  row.details, row.createdOn));

    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM contactus";
        return this.common.findAll(sqlRequest).then(rows => {
            let requestSupportCollection = [];
            for (const row of rows) {
                requestSupportCollection.push(new ContactUs(row.id, row.name, row.eMailID, row.mobileNo,  row.details, row.createdOn));
            }
            return requestSupportCollection;
        });
    };


    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM contactus";
        return this.common.findOne(sqlRequest);
    };



    /**
     * Creates the given entity in the database
     * @params donate
     * returns database insertion status
     */
    create(requestSupport) {
        let sqlRequest = "INSERT into contactus (name, eMailID, mobileNo, details, createdOn) " +
            "VALUES ($name, $eMailID, $mobileNo, $details, $createdOn)";

        let sqlParams = {
            $name: requestSupport.name,
            $eMailID: requestSupport.eMailID,            
            $mobileNo: requestSupport.mobileNo,
            $details: requestSupport.details,
            $createdOn: requestSupport.createdOn            
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params donate
     * returns database insertion status
     */
    createWithId(requestSupport) {
        let sqlRequest = "INSERT into contactus (id, name, eMailID, mobileNo, details) " +
            "VALUES ($id, $name, $eMailID, $mobileNo, $details, $createdOn)";

        let sqlParams = {
            $name: requestSupport.name,
            $eMailID: requestSupport.eMailID,
            $mobileNo: requestSupport.mobileNo,            
            $details: requestSupport.details,
            $createdOn: requestSupport.createdOn            
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM contactus WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM contactus WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    update(requestSupport) {
        let sqlRequest = "UPDATE contactus SET " +            
            "isApproved= $isApproved " +
            "WHERE id=$id";

        let sqlParams = {
            $id: requestSupport.id,        
            $isApproved: requestSupport.isApproved
        };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = ContactUsDao;
