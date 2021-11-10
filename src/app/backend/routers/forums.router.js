module.exports = app => {
    const forums = require("../controllers/forums.controller");
    var router = require("express").Router();

    router.post("", forums.createCategory);

    router.put("/:category", forums.addSubcategory);
    router.put("/:category/:subCategory", forums.addSubject);
    router.put("/post/:subcategory", forums.postToSubcategory);

    router.get("", forums.retrieveAllCategories);
    router.get("/:category", forums.retrieveCategory);
    router.get("/subcategory/:subcategory", forums.retrieveSubcategory);

    app.use("/api/forums", router);
};