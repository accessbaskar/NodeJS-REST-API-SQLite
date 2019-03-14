class RequestSupport {
    constructor(id, name, eMailID, typeOfNeed, requestType, mobileNo, amount, details, address, createdOn, isApproved, idImage) {
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
        this.isApproved = isApproved;
        this.idImage = idImage
    }
}
module.exports = RequestSupport;