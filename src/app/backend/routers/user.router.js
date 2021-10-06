module.exports = app => {
    const users = require("../controllers/user.controller");
    var router = require("express").Router();


    router.post("", users.register);
    router.get("/:id", users.findOne);
    router.get("", users.findAll);

    app.use("/api/users", router);
}