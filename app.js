const express = require('express');
const path = require("path");
const cors = require("cors");
const DBConnection = require("./database/mongoose");
const routes = require("./router/routes");
const https = require("https");
const {certs} = require("./cert/index");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 3000;
const publicFolder = path.join(__dirname,"/public");
const quizFolder = path.join(__dirname,"/public/pages/nursing/trial-1");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(publicFolder));
app.use(express.static(quizFolder));
app.use(routes);


DBConnection(app,port);

// const server = https.createServer(app);
// app.listen(port,()=>console.log(`server running on port: ${port}`));