module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      skillId:String,
      name:String,
      users:[String],
      createdAt: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Skill = mongoose.model("Skill", schema);
  return Skill;
};
