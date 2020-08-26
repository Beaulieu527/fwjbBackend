const db = require("../model");
// const userRoutes = require("../routes/user.routes");
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    skills:req.body.skills,
    interests:req.body.interests,
    name:req.body.name,
  });

  // Save User in the database
  user
    .save(user)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
// Retrieve all Users from the database by User Name.
exports.findAll = (req, res) => {

  User.find( function(err, foundUsers){
    if (err){
      console.log(err);
    } else {
        res.json(foundUsers);
    }
  });

};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      })
};

// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
      
      User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update User with id=${id}. Maybe User was not found!`
            });
          } else {
              res.send("Successfully updated User");
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating User with id=" + id
          });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
};

//add skill to user
exports.addSkillToUser = (req,res)=>  {
  let userId = req.params.id;
  let skill = req.body.skill;
  var userToUpdate = User.findOne({_id: userId},function(err,foundUser){
    if(err)
      return err;
    else{
      foundUser.skills.push({_id:skill});
      foundUser.save();
      res.json(foundUser);
    }

  });
  
};

//add interest to user
exports.addInterestToUser = (req,res)=> {
  let userId = req.params.id;
  let interest = req.body.interest;

  var userToUpdate = User.findOne({_id: userId},function(err,foundUser){
    if(err)
      return err;
    else{
      foundUser.interests.push({_id:interests});
      foundUser.save();
      res.json(foundUser);
    }
  });
};

exports.getUserSkills =(req,res)=> {
  const userId = req.params.id;
  
  res.json(
    User.findById(userId).populate("skills")
  ) 
};

exports.getUserInterests =(req,res)=> {
  // console.log(req.params);
  const userId = req.params.id;
  console.log(userId);
  res.json(
    User.findById(userId).populate("interests")
    )
};