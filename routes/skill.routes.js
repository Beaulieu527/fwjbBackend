module.exports = app => {
    const skills = require("../controllers/skill.controller.js");
  
    var router = require("express").Router();
  
    // Create a new skills
    router.post("/", skills.create);
  
    // Retrieve all skills
    router.get("/", skills.findAll);
  
    // Retrieve a single skills with id
    router.get("/:id", skills.findOne);
  
    // Update a skills with id
    router.put("/:id", skills.update);
  
    // Delete a skills with id
    router.delete("/:id", skills.delete);
    
    app.use('/api/skills', router);
  };