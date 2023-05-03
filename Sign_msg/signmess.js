
const aptos = require('aptos');
var express = require('express');

var path = require('path');
var app = express();
app.use(express.urlencoded());

app.get('/signmess.html', function(req,res){
  res.sendFile( __dirname + "/" + "signmess.html");
})

app.use(express.static(path.join(__dirname, "./")));


    
const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");
    var server = app.listen(8081, function(){
        var host = server.address().address
        var port = server.address().port
    
        console.log("example app listening at http://%s:%s", host, port)
    })