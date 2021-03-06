const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect("mongodb://127.0.0.1:27017/archi");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/task.routes')(app);

app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


