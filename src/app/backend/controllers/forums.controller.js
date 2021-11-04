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
        subjects:[]
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

exports.postToSubject = (request,response)=> {
    const category = request.params.category;
    const subCategory = request.params.subCategory;
    const subject = request.params.subject;
    const curTime = new Date();
    // TODO: postId improvements
    // Using Date.now() is NOT a guaranteed 100% unique ID as there is a small
    // chance that creating posts at the same exact time to the millisecond results
    // in the same ids.
    const post = new ForumPost({
        postId: curTime.now(),
        title: request.body.title,
        content: request.body.content,
        author: request.body.author,
        isArchived: false,
        comments:[]
    });

    // Save the post to the database
    post.save(post);

    Forum.findOneAndUpdate(
        {$and:[
            {'name':category},
            {'subCategories':{$elemMatch:{'name':subCategory}}},
            {'subCategories.subjects':{$elemMatch:{'name':subject}}}
        ]},
        {$push:{'subCategories.subjects.posts':post.postId}}
    ).then(data=> {
        response.send(data);
    }).catch(error=> {
        response.status(500).send({
            message:error.message || "An error occurred attempting to post to the subject"
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

