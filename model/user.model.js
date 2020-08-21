module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userId:String,
      userName:String,
      skills:[String],
      interests:[String],
      email: String,
      createdAt: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};

