

class UploadController {

    constructor() {

    }

    upload(req, res) {
        debugger;
        console.log(req.body.name);
        if (!req.file) {
            console.log("No file received");
            res.json({
                code: 400,
                status: false,
                message: "Failed"
            });

        } else {
            console.log('file received');
            res.json({
                status: true,
                code: 200,
                message: "Success"
            })
        }
    };

}

module.exports = UploadController;
