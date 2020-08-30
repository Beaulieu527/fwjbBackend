module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new users
    router.post("/", users.create);
  
    // Retrieve all users
    router.get("/", users.findAll);
  
    // Retrieve a single users with id
    router.get("/:id", users.findOne);
  
    // Update a users with id
    router.put("/:id", users.update);
  
    // Delete a users with id
    router.delete("/:id", users.delete);

    // Retrieve all skills of a user  
    router.get("/:id/skills",users.getUserSkills)

    // Retrieve all interests of a user  
    router.get("/:id/interests",users.getUserInterests)

    // Post a new skill to a user
    router.post("/:id/skills/",users.addSkillToUser);

    // Post a new interest to a user
    router.post("/:id/interests/",users.getUserInterests);

    app.use('/api/users', router);
  };