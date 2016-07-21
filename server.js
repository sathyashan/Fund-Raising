var express = require('express');
var app = express();
var path = require('path');
app.use(express.static("static"));

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname + '/index.html'));
});

var port = Number(process.env.PORT || 8083);

app.listen(port, function(){
    console.log("server running");
});