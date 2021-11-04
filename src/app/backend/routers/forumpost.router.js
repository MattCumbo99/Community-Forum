module.exports = app => {
    const forumPosts = require("../controllers/forumpost.controller");
    var router = require("express").Router();
    
    router.put("/comment/:id", forumPosts.addComment);
    router.get("/:id", forumPosts.getPostbyId);

    app.use("/api/posts", router);
}