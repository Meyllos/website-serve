const http = require('http');
const express = require('express');
//const app  = require('./app');
const app  = express()
app.use(express.static('public'));

// const port = process.env.PORT || 3000;
// const server = http.createServer(app);

server.listen(port, ()=> { console.log(`server up and running on Port ${port}`);});