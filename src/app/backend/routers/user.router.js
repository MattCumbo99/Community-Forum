module.exports = app => {
    const users = require("../controllers/user.controller");
    var router = require("express").Router();


    router.post("", users.register);
    router.put("/:id", users.updateOne);
    router.get("/:id", users.findOne);
    router.get("", users.findAll);
    router.get("/login/:username/:password", users.grabLogin);

    app.use("/api/users", router);
}