module.exports = app => {
    const bans = require("../controllers/ban.controller");
    var router = require("express").Router();

    router.post("", bans.addNew);
    router.get("", bans.grabAll);
    router.get("/:id", bans.grabOne);
    router.put("/:id", bans.updateBan);

    app.use("/api/bans", router);
}