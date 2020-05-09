/* Load User entity */
const User = require('../model/user');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * User Data Access Object
 */
class UserDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, name, address, dob, email FROM User WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new User(row.id, row.name, row.address, row.dob, row.email, row.pwd));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM user";
        return this.common.findAll(sqlRequest).then(rows => {
            let users = [];
            for (const row of rows) {
                users.push(new User(row.id, row.name, row.address, row.dob, row.email, row.pwd));
            }
            return users;
        });
    };

    /**
     * check if User and password exist in  database
     * @return count
     */

    validateUser(User) {
        //let sqlRequest = "SELECT COUNT(*) FROM User WHERE name =" + $name + "and pwd =" + $pwd;

        let sqlRequest = "SELECT id,email FROM user WHERE" +
            " name=$name" +
            " and pwd=$pwd";
        let sqlParams = {
            $name: User.name,
            $pwd: User.pwd
        };
        console.log(User);        
        return this.common.findOne(sqlRequest, sqlParams);
    };

    validateOtpWithUser(User) {
        //let sqlRequest = "SELECT COUNT(*) FROM User WHERE name =" + $name + "and pwd =" + $pwd;

        let sqlRequest = "SELECT * FROM user WHERE" +
            " id=$id" +
            " and otp=$otp";
        let sqlParams = {
            $id: User.id,
            $otp: User.otp
        };
        console.log(User);        
        return this.common.findOne(sqlRequest, sqlParams);
    };


    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM user";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params User
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(User) {
        let sqlRequest = "UPDATE user SET " +
            "name=$name, " +
            "address=$address, " +
            "dob=$dob, " +
            "email=$emailr " +
            "WHERE id=$id";

        let sqlParams = {
            $name: User.name,
            $address: User.address,
            $dob: User.dob,
            $email: User.email,
            $id: User.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };
    updateOtp(User) {
        let sqlRequest = "UPDATE user SET " +
            "otp=$otp " +            
            
            "WHERE id=$id";

        let sqlParams = {
            $otp: User.otp,            
            
            $id: User.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params User
     * returns database insertion status
     */
    create(User) {
        let sqlRequest = "INSERT into user (name, address, dob, email, pwd, mobileno, aboutUser, userType, donarType, createdon, role, idImage) " +
            "VALUES ($name, $address, $dob, $email, $pwd, $mobileno,  $aboutUser, $userType, $donarType, $createdon, $role, $idImage)";
        let sqlParams = {
            $name: User.name,
            $address: User.address,
            $dob: User.dob,
            $email: User.email,
            $pwd: User.pwd,
            $mobileno: User.mobileno,
            $aboutUser: User.aboutUser,
            $userType: User.userType,
            $donarType: User.donarType,
            $createdon: User.createdon,
            $role: User.role,
            $idImage: User.idImage
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params User
     * returns database insertion status
     */
    createWithId(User) {
        let sqlRequest = "INSERT into user (id, name, address, dob, email) " +
            "VALUES ($id, $name, $address, $dob, $email)";
        let sqlParams = {
            $name: User.name,
            $address: User.address,
            $dob: User.dob,
            $email: User.email,
            $id: User.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM user WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM user WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = UserDao;
