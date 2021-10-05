const db = require("../models");
const User = db.users;

exports.register = (request,response)=> {
    // Grab the parameters from the url
    const user = new User({
        username: request.body.username,
        password: request.body.password,
        privilege: 1,
        email: request.body.email,
        dateCreated: new Date(),
        birthday: request.body.birthday,
        signature: null,
        posts: [],
        comments: []
    });

    // Save the user in the database
    user.save(user)
    .then(data=> {
        response.send(data);
    })
    .catch(err=> {
        response.status(500).send({
            message:
                err.message || "Some error occurred registering the user"
        });
    });
};

exports.findOne = (request,response)=> {
    const id = request.params.id;

    // Look through the database for the user with the corresponding username
    User.find({username:id}).then(data=> {
        if (!data) 
            response.status(404).send({message:"No user was found with the username of " + id});
        else response.send(data);
    })
    .catch(err=> {
        response.status(500).send({message:err});
    });
};
