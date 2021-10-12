const db = require("../models");
const Ban = db.bans;

exports.addNew = (request,response)=> {
    const ban = new Ban({
        username: request.body.username,
        reason: request.body.reason,
        lengthText: request.body.lengthText,
        author: request.body.author,
        expiryDate: request.body.expiryDate,
        // These are for manually unbanning the user
        unbanned:false,
        unbanReason:"",
        unbanAuthor:""
    });

    // Save the ban to the database
    ban.save(ban).then(data=> {
        response.send(data);
    })
    .catch(error=> {
        response.status(500).send({
            message:error.message || "An error occurred creating the ban."
        });
    });
};

exports.grabOne = (request,response)=> {
    const id = request.params.id;

    Ban.findOne({username:id}).then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "Could not grab from database!"
        });
    });
};

exports.grabAll = (request,response)=> {

    Ban.find().then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "Could not retrieve bans!"
        });
    });
}

exports.updateBan = (request,response)=> {
    const id = request.params.id;

    Ban.updateOne(
        {username:id},
        {$set:request.body}
    ).then(res=> {
        response.send(res);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "Could not update in database (500)"
        });
    });
};
