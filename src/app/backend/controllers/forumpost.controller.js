const db = require("../models");
const ForumPost = db.posts;

exports.addComment = (request,response)=> {
    const id = request.params.id;
    const comment = {
        content: request.body.content,
        username: request.body.username,
        datePosted: new Date()
    };

    ForumPost.findOneAndUpdate(
        {postId:id},
        { $push:{'comments':comment} }
    ).then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "An error occurred adding a comment"
        });
    });
};

exports.getPostbyId = (request,response)=> {
    const id = request.params.id;
    
    ForumPost.findOne({postId:id}).then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "An error occurred getting the post by ID"
        });
    });
};