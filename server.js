const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const port = process.env.PORT || 8080;
const CUSTOMER_COLLECTION = "customer";
const FORMFIELD_COLLECTION = "formFields";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

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

app.get("/api/customer", (req, res) => {

});

app.get("/api/formFields", (req, res) => {

});


/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/customer/:id", (req, res) => {
  
});

app.patch("/api/customer", (req, res) => {

})
