module.exports = app => {
    const forums = require("../controllers/forums.controller");
    var router = require("express").Router();

    router.post("", forums.createCategory);

    router.put("/:category", forums.addSubcategory);
    router.put("/:category/:subCategory", forums.addSubject);
    router.put("/:category/:subCategory/:subject", forums.postToSubject);

    router.get("", forums.retrieveAllCategories);

    app.use("/api/forums", router);
};