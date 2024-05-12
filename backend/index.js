const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.port;
const taskRoute = require('./routes/TaskRoute');
const db = require("./DBConfig");
const cors = require("cors");
app.use(cors());

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/', taskRoute);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});