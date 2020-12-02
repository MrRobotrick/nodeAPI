const sql = require("./db.js");

// constructor
const Tests = function(tests) {
  this.id = tests.id;
  this.name = tests.name;
  this.email = tests.email;
};

Tests.create = (newTests, result) => {
  sql.query("INSERT INTO tests SET ?", newTests, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tests: ", { id: res.insertId, ...newTests });
    result(null, { id: res.insertId, ...newTests });
  });
};

Tests.findById = (testsId, result) => {
  sql.query(`SELECT * FROM tests WHERE id = ${testsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tests: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tests with the id
    result({ kind: "not_found" }, null);
  });
};

Tests.getAll = result => {
  sql.query("SELECT * FROM tests ORDER BY name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tests: ", res);
    result(null, res);
  });
};

Tests.updateById = (id, tests, result) => {
  sql.query(
    "UPDATE tests SET name = ?, email = ? WHERE id = ?",
    [tests.name, tests.email, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tests with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tests: ", { id: id, ...tests });
      result(null, { id: id, ...tests });
    }
  );
};

Tests.remove = (id, result) => {
  sql.query("DELETE FROM tests WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tests with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tests with id: ", id);
    result(null, res);
  });
};

/*Tests.removeAll = result => {
  sql.query("DELETE FROM tests", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tests`);
    result(null, res);
  });
};*/

module.exports = Tests;