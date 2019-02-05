const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const port = process.env.PORT || 8000;
const CUSTOMER_COLLECTION = "customer";
const FORMFIELD_COLLECTION = "formFields";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.listen(port);
let db;

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:8000/", function (err, client) {
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


app.get("/api/customer", (req, res) => {
  db.collection(CONTACTS_COLLECTION).find({}).toArray((err, docs) => {
    if (err) {
      handleError(res, err.message, "Failed to get customers data.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/customer/:id", (req, res) => {
  db.collection(CUSTOMER_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, (err, doc) => {
    if (err) {
      handleError(res, err.message, "Failed to get customer data.");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.patch("/api/customer", (req, res) => {
  const updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, (err, doc) => {
    if (err) {
      handleError(res, err.message, "Failed to update contact data.");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
})


app.get("/api/formFields", (req, res) => {
  db.collection(FORMFIELD_COLLECTION).find({}).toArray((err, docs) => {
    if (err) {
      handleError(res, err.message, "Failed to get form fields data.");
    } else {
      res.status(200).json(docs);
    }
  });
});
