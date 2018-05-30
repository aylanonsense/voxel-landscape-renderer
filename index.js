// create a server
const express = require('express');
const app = express();

// serve the web files
app.use(express.static(__dirname + '/public'));

// run the server
app.listen(process.env.PORT || 3000);