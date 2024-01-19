const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.authority = require("./authority.model");
db.post = require("./post.model");

db.ROLES = ["user", "admin"];

module.exports = db;
