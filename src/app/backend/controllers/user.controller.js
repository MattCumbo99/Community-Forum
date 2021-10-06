const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.users;

exports.register = (request,response)=> {
    // Encrypt the password
    let truePass = "";
    bcrypt.genSalt(10, function(saltError,salt) {
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
                }
            });
        }
    });
};

exports.findOne = (request,response)=> {
    const id = request.params.id;

    // Look through the database for the user with the corresponding username
    User.findOne({username:id}).then(data=> {
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
