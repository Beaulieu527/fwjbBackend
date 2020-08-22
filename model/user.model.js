module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      googleId:String,
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

  //hash and salt users and save to db
  userSchema.plugin(passportLocalMongoose);
  userSchema.plugin(findOrCreate);

  const User = mongoose.model("user", schema);

  passport.use(User.createStrategy());
 
  passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //passport google oauth
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
  ));

  return User;
};

