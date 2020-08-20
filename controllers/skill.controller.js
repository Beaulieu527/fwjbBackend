const db = require("../model");
const Skill = db.skill;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Name can not be empty!" });
      return;
    }
  
    // Create a Skill
    const skill = new Skill({
      name: req.body.name,
      email: req.body.email,
    });
  
    // Save Skill in the database
    skill
      .save(Skill)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Skill.",
        });
      });
  };
  // Retrieve all Skills from the database by Skill Name.
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = 
      ? { name: { $regex: new RegExp(name), $options: "i" } }
      : {};
  
    Skill.find(condition)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Skills.",
        });
      });
  };
  
  // Find a single Skill with an id
  exports.findOne = (req, res) => {
      const id = req.params.id;
  
      Skill.findById(id)
        .then(data => {
          if (!data)
            res.status(404).send({ message: "Not found Skill with id " + id });
          else res.send(data);
        })
        .catch(err => {
          res
            .status(500)
            .send({ message: "Error retrieving Skill with id=" + id });
        })
  };
  
  // Update a Skill by the id in the request
  exports.update = (req, res) => {
      if (!req.body) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }
      
        const id = req.params.id;
      
        Skill.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update Skill with id=${id}. Maybe Skill was not found!`
              });
            } else res.send({ message: "Skill was updated successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Skill with id=" + id
            });
          });
  };
  
  // Delete a Skill with the specified id in the request
  exports.delete = (req, res) => {
      const id = req.params.id;
  
      Skill.findByIdAndRemove(id)
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot delete Skill with id=${id}. Maybe Skill was not found!`
            });
          } else {
            res.send({
              message: "Skill was deleted successfully!"
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Skill with id=" + id
          });
        });
  };
  