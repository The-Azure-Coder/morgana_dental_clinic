require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers

// const indexRouter = require();
const dentistRouter = require("./routes/dentist.route");

// Routes

app.use("", dentistRouter);

module.exports = app;
