const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.get('/', (req, res) => {
    
});

app.listen(3000, function() {
    console.log("Server started on port 3000.");
  });

//npm start, open your browser and run localhost:port