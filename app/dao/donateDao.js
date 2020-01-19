/* Load donate entity */
const Donate = require('../model/donate');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * donate Data Access Object
 */
class DonateDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, name, eMailID, mobileNo, amount, createdOn, status FROM Donate WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Donate(row.id, row.name, row.eMailID, row.mobileNo, row.amount, row.createdOn, row.status));

    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM Donate";
        return this.common.findAll(sqlRequest).then(rows => {
            let donateCollection = [];
            for (const row of rows) {
                donateCollection.push(new Donate(row.id, row.name, row.eMailID, row.mobileNo, row.amount, row.createdOn, row.status));
            }
            return donateCollection;
        });
    };


    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM Donate";
        return this.common.findOne(sqlRequest);
    };
    getSum(){
        let sqlRequest = "SELECT SUM(amount) as totalAmount from Donate where status='Y'";
        return this.common.findOne(sqlRequest);
    }


    /**
     * Creates the given entity in the database
     * @params donate
     * returns database insertion status
     */
    create(donate) {
        let sqlRequest = "INSERT into donate (name, eMailID, mobileNo, amount, createdOn, status) " +
            "VALUES ($name, $eMailID, $mobileNo, $amount, $createdOn, $status)";
       
        let sqlParams = {
            $name: donate.name,
            $eMailID: donate.eMailID,
            $mobileNo: donate.mobileNo,
            $amount: donate.amount,
            $createdOn: donate.createdOn,
            $status: donate.status
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params donate
     * returns database insertion status
     */
    createWithId(donate) {
        let sqlRequest = "INSERT into donate (id,name, eMailID, mobileNo, amount, createdOn, status) " +
            "VALUES ($id, $name, $eMailID, $mobileNo, $amount, $createdOn, $status)";

        let sqlParams = {
            $name: donate.name,
            $eMailID: donate.eMailID,
            $mobileNo: donate.mobileNo,
            $amount: donate.amount,
            $createdOn: donate.createdOn,
            $status: donate.status
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM donate WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM donate WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = DonateDao;
