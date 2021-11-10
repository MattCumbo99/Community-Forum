const db = require("../models");
const ForumPost = db.posts;

exports.createPost = (request,response)=> {
    // TODO: Change method of determining postId
    const forumpost = new ForumPost({
        postId: request.body.postId,
        title: request.body.title,
        author: request.body.author,
        content: request.body.content,
        subcategory: request.body.subcategory,
        subject: "",
        isArchived: false,
        stickied: false,
        comments: []
    });

    forumpost.save(forumpost).then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "Error adding post to database"
        });
    });
};

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