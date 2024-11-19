const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
require('dotenv').config();
const connectToDb = require('../db.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const validator = require('validator');

const twoFA = {}


router.get('/test', async (req, res) => {
    try {
        const db = await connectToDb()
        if (!db) {
            return res.status(500).json({ message: "Erreur à la base de données" })
        }

        let a = 10;

        res.status(200).json({ message: "a"});
    } catch (err) {
        console.error('Erreur');
        res.status(500).json({message : "Erreur", error: err})
    }

});

module.exports = router