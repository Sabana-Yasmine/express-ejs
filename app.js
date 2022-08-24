const express = require('express');
const app = express();
require('dotenv').config();
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const db = require('./db/db')
const user = require('./user/user-verify')
app.use(express.json());


app.use('/user', user)

port = 9000;

app.set("view engine", "ejs");

app.listen(port, ()=>{
    console.log("server created");
})
