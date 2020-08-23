require('dotenv/config') 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//auth imports
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");

const db = require("./model");

var corsOptions = {
  origin: "http://localhost:8081"
};

// app.use(cors())
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//passport auth setup
app.use(passport.initialize());
app.use(passport.session());


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to FWJB API." });
});


require("./routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app