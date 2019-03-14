/**
 * Car Entity (ES6 Class)
 */

class User {
    constructor(id, name, address, dob, email, pwd, mobileno, aboutUser, userType, donarType, role, idImage) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.dob = dob;
        this.email = email;
        this.pwd = pwd;
        this.mobileno = mobileno;
        this.aboutUser = aboutUser;
        this.userType = userType;
        this.donarType = donarType;
        this.role = role;
        this.idImage = idImage
    }

}
module.exports = User;