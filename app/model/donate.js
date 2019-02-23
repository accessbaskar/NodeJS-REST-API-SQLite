class Donate {
    constructor(id, name, eMailID, mobileNo, amount, createdOn, status) {
        this.id = id;
        this.name = name;
        this.eMailID = eMailID;
        this.mobileNo = parseInt(mobileNo);
        this.amount = amount;
        this.createdOn = createdOn;
        this.status = status
    }
}
module.exports = Donate;