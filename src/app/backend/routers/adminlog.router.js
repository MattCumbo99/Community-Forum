module.exports = app => {
    const adminLogs = require("../controllers/adminlog.controller");
    var router = require("express").Router();

    router.post("", adminLogs.create);
    router.get("", adminLogs.retrieveAll);
    router.get("/:id", adminLogs.retrieveByUser);

    app.use("/api/adminlogs", router);
};