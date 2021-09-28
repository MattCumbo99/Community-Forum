// Call the collection of databases
const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// Add each database model below in similar fashion
//db.users = require("./user.model.js")(mongoose);
db.users = require("./user.model")(mongoose);

module.exports = db;
