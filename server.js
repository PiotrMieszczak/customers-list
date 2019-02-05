const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const port = process.env.PORT || 8080;
var CONTACTS_COLLECTION = "customer";

var app = express();
app.use(bodyParser.json());


let db;

console.log('process.env.MONGODB_URI', process.env);

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:8080/", function (err, client) {
  if (err) {
    process.exit(1);
  }

  db = client.db();
  console.log("Database connection ready");

  const server = app.listen(port, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
})


// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/customer"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/customer", function(req, res) {
});

app.post("/api/customer", function(req, res) {
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/customer/:id", function(req, res) {
});

app.put("/api/customer/:id", function(req, res) {
});

app.delete("/api/customer/:id", function(req, res) {
});

