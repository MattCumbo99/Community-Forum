module.exports = app => {
    const users = require("../controllers/user.controller");
    var router = require("express").Router();


    router.post("/", users.register);
    router.get("/:id", users.findOne);

    app.use("/api/users", router);
}