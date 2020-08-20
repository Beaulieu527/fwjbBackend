const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skillId:String,
    name:String,
    users:[String],
    createdAt: String,
  });
  

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
