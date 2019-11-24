// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();
const path = require("path");
var formdata = require('./router.js');

// server configuration
const PORT = 8080;

app.use('/formdata', formdata);

app.use('/', (req, res, next) =>{//middleware
	console.log("new request recieved at"+Date.now());
	next();
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/main.html'));
});


app.post('/formdata', (req, res,next) =>{//middleware
	console.log("form submitted");
	next();
});

//app.use("/router", formdata);

app.get('*', (req, res, next) =>{
	res.send("invalid url")
	next();
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`4Server running at: http://localhost:${PORT}/`);
});	