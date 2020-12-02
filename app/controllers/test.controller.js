const Tests = require("../models/test.model.js");

// Create and Save a new Tests
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an ActiveSub
  const tests = new Tests({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email
	});

  // Save Tests in the database
  Tests.create(tests, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tests."
      });
    else res.send(data);
  });
};

// Retrieve all Testss from the database.
exports.findAll = (req, res) => {
    Tests.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving ActiveSubs."
          });
        else res.send(data);
      });
};

// Find a single Tests with a id
exports.findOne = (req, res) => {
    Tests.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tests with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Tests with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a Tests identified by the custoidmerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Tests.updateById(
    req.params.id,
    new Tests(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tests with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tests with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tests with the specified id in the request
exports.delete = (req, res) => {
    Tests.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tests with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Tests with id " + req.params.id
          });
        }
      } else res.send({ message: `${req.params.name} was deleted successfully!` });
    });
  };

