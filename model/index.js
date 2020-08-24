const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./User.model.js")(mongoose);
db.skills = require("./Skill.model.js")(mongoose);
module.exports = db;