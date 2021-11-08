const db = require("../models");
const Forum = db.forums;
const ForumPost = db.posts;

exports.createCategory = (request,response)=> {
    const category = new Forum({
        name: request.body.name,
        description: request.body.description,
        subCategories:[],
        posts:[]
    });

    category.save(category).then(data=> {
        response.send(data);
    })
    .catch(error=> {
        response.status(500).send({
            message:error.message || "An error occurred creating the category."
        });
    });
};

exports.addSubcategory = (request,response)=> {
    const category = request.params.category;
    const subCategory = {
        name: request.body.name,
        description: request.body.description,
        subjects:[],
        posts:[]
    };

    Forum.findOneAndUpdate(
        {'name':category}, 
        { $push:{'subCategories':subCategory} } // Push to the subcategory array
    ).then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "An error occurred attempting to add a subcategory"
        });
    });
};

exports.addSubject = (request,response)=> {
    const category = request.params.category;
    const subCategory = request.params.subCategory;
    // Create the new subject object to add
    const subject = {
        name: request.body.name,
        description: request.body.description,
        posts:[]
    };

    Forum.findOneAndUpdate(
        {$and:[ // Add to the category's subcategory
            {'name':category},
            { 'subCategories':{$elemMatch:{'name':subCategory}} }
        ]},
        { $push:{'subCategories.$.subjects':subject} }
    ).then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "An error occurred adding a subject"
        });
    });
};

exports.postToCategory = (request,response)=> {
    const category = request.params.category;
    // TODO: Change method of determining postId
    const forumpost = new ForumPost({
        postId: new Date().now(),
        title: request.body.title,
        author: request.body.author,
        content: request.body.content,
        isArchived: false,
        stickied: false,
        comments: []
    });

    // Save the post to the database
    forumpost.save(forumpost);

    // Push the post ID to the category's posts
    Forum.findOneAndUpdate(
        {name:category},
        { $push:{'posts':forumpost.postId} }
    ).then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "An error occurred posting to category"
        });
    });
};

// Adds a new post and its postId to a subcategory
exports.postToSubcategory = (request,response)=> {
    const category = request.params.category;
    const subcategory = request.params.subcategory;
    // TODO: Change method of determining postId
    const forumpost = new ForumPost({
        postId: new Date().now(),
        title: request.body.title,
        author: request.body.author,
        content: request.body.content,
        isArchived: false,
        stickied: false,
        comments: []
    });
    
    // Save the post to the database
    forumpost.save(forumpost);

    Forum.findOneAndUpdate(
        {$and:[
            {'name':category},
            {'subCategories':{$elemMatch:{'name':subcategory}}}
        ]},
        { $push:{'subCategories.$.posts':forumpost.postId} }
    ).then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "Error posting to subcategory"
        });
    });
};

exports.retrieveAllCategories = (request,response)=> {
    Forum.find().then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "Error in attempting to get categories"
        });
    });
};

