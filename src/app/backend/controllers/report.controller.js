const db = require("../models");
const Report = db.reports;

exports.createNew = (request,response)=> {
    const newReport = new Report({
        reportId: request.body.reportId,
        sender: request.body.sender,
        user: request.body.user,
        reason: request.body.reason,
        details: request.body.details,
        status: 0
    });

    // Save the report to the database
    newReport.save(newReport).then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({message:error.message || "An error occurred creating the report."});
    });
};

exports.getAll = (request,response)=> {
    // Return all the reports from the database
    Report.find().then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({message:error.message || "Could not retrieve reports!"});
    });
};

exports.updateOne = (request,response)=> {
    const id = request.params.id;
    console.log(request.body.toString());

    Report.findOneAndUpdate({reportId:id}, {status:request.body}).then(res=> {
        response.send(res);
    }).catch(error=> {
        response.status(500).send({message:error.message || "Could not update report!"});
    });
};
