const db = require("../models");
const Forum = db.forums;
const ForumPost = db.posts;

exports.createCategory = (request,response)=> {
    const category = new Forum({
        name: request.body.name,
        description: request.body.description,
        subCategories:[]
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
        minPostPrivilege: request.body.minPostPrivilege,
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

// Adds a new post and its postId to a subcategory
exports.postToSubcategory = (request,response)=> {
    const category = request.params.category;
    const subcategoryPost = request.params.subcategory;
    // TODO: Change method of determining postId
    const forumpost = new ForumPost({
        postId: new Date().now(),
        title: request.body.title,
        author: request.body.author,
        content: request.body.content,
        subcategory: subcategoryPost,
        subject: "",
        isArchived: false,
        stickied: false,
        comments: []
    });
    
    // Save the post to the database
    forumpost.save(forumpost);

    // Find the category with the matching subcategory and push
    // the post id to the posts array
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

exports.retrieveCategory = (request,response)=> {
    const category = request.params.category;

    Forum.findOne({'name':category}).then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "Error retrieving category"
        });
    });
};
