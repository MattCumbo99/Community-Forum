module.exports = app => {
    const forums = require("../controllers/forums.controller");
    var router = require("express").Router();

    router.post("", forums.createCategory);

    router.put("/:category", forums.addSubcategory);
    router.put("/:category/:subCategory", forums.addSubject);
    router.put("/post/:category", forums.postToCategory);
    router.put("/post/:category/:subcategory", forums.postToSubcategory);

    router.get("", forums.retrieveAllCategories);

    app.use("/api/forums", router);
};