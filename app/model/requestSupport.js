class RequestSupport {
    constructor(id, name, eMailID, typeOfNeed, requestType, mobileNo, amount, details, address, createdOn) {
        this.id = id;
        this.name = name;
        this.eMailID = eMailID
        this.typeOfNeed = typeOfNeed;
        this.requestType = requestType;
        this.mobileNo = mobileNo;
        this.amount = amount;
        this.details = details;
        this.address = address;
        this.createdOn = createdOn;
    }
}
module.exports = RequestSupport;