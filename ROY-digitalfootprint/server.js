var express = require('express');
var app = express();

app.use(express.static("public"));

app.get("/", function(req, res) {});

app.listen(8083, function() {
    console.log('Server is running on port: ', 8083);
});