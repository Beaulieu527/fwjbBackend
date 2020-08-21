require('dotenv/config') 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to FWJB API." });
});

require("./routes/skill.routes")(app);
require("./routes/user.routes")(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});