module.exports = app => {
    const tests = require("../controllers/test.controller.js");
  
    // Create a new Tests
    app.post("/tests", tests.create);
  
    // Retrieve all Tests
    app.get("/tests", tests.findAll);
  
    // Retrieve an single Tests with numb
    app.get("/tests/:id", tests.findOne);
  
    // Update an Tests with numb
    app.put("/tests/:id", tests.update);
  
    // Delete an Tests with numb
    app.delete("/tests/:id", tests.delete);
  
    // Delete all Tests
    //app.delete("/tests", tests.deleteAll);
  };