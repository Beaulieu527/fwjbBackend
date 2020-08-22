const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");

module.exports = mongoose => {
  var userSchema = mongoose.Schema(
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

  userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
  //hash and salt users and save to db
  userSchema.plugin(passportLocalMongoose);
  userSchema.plugin(findOrCreate);
  const User = mongoose.model("user", userSchema);

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

