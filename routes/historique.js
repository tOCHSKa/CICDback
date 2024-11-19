const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();
const connectToDb = require("../db.js");
const jwt = require("jsonwebtoken");


module.exports = router