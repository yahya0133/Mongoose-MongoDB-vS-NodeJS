const express = require("express");
const app = express();
require('dotenv').config();
const db_connect=require("./connect_db");
db_connect();


app.listen(process.env.PORT , (err)=>err?console.log(err):console.log(" server is runing"));