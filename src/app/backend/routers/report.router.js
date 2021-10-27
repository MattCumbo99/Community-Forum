module.exports = app => {
    const reports = require("../controllers/report.controller");
    var router = require("express").Router();

    router.post("", reports.createNew);
    router.get("", reports.getAll);
    router.put("/:id", reports.updateOne);

    app.use("/api/reports", router);
};