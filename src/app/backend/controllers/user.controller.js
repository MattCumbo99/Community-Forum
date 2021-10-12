const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.users;

const saltRounds = 10;

exports.register = (request,response)=> {
    // Encrypt the password
    let truePass = "";
    bcrypt.genSalt(saltRounds, function(saltError,salt) {
        if (saltError) {
            throw saltError;
        } else {
            bcrypt.hash(request.body.password, salt, function(hashError, hash) {
                if (hashError) {
                    throw hashError;
                } else {
                    // Encryption successful
                    truePass = hash;
                    // Grab the parameters from the url
                    const user = new User({
                        username: request.body.username,
                        password: truePass,
                        privilege: 1,
                        email: request.body.email,
                        dateCreated: new Date(),
                        birthday: request.body.birthday,
                        signature: "",
                        location: "",
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
                }
            });
        }
    });
};

exports.updateRole = (request,response)=> {
    const id = request.params.id;

    User.updateOne(
        {username:id}, // User parameters to look for
        { $set:request.body }
    ).then(res=> {
        response.send(res);
    }).catch(err=> {
        response.status(500).send(err);
    });
};

exports.grabLogin = (request,response)=> {
    const username = request.params.username;
    const pass = request.params.password;

    // Look through the database for the user with the corresponding password
    // Collation is used for ignoring casing
    User.findOne({username:username}).collation({locale:'en', strength:2}).then(data=> {
        // Compare hashed functions
        bcrypt.compare(pass, data.password, function(err,result) {
            if (result) {
                response.send(data);
            }
            else {
                response.send(null);
            }
        });
    })
    .catch(err=> {
        response.status(500).send({message:err});
    });
};

exports.findOne = (request,response)=> {
    const id = request.params.id;

    // Look through the database for the user with the corresponding username
    User.findOne({username:id}).collation({locale:'en', strength:2}).then(data=> {
        response.send(data);
    })
    .catch(err=> {
        response.status(500).send({message:err});
    });
};

exports.findAll = (request,response)=> {
    User.find().then(data=> {
        response.send(data);
    })
    .catch(err=> {
        response.status(500).send({message:err});
    });
};
