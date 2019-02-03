/**
 * Car Entity (ES6 Class)
 */

class User {
    constructor(id, name, address, dob, email, pwd, mobileno) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.dob = dob;
        this.email = email;
        this.pwd = pwd;
        this.mobileno = mobileno;
    }
}

module.exports = User;
