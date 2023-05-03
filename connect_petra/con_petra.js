const fetch = require('node-fetch');
const aptos = require('aptos');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.urlencoded());

app.get('/con_petra.html', function(req,res){
  res.sendFile( __dirname + "/" + "con_petra.html");
})


    
    const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");
    var server = app.listen(8081, function(){
        var host = server.address().address
        var port = server.address().port
    
        console.log("example app listening at http://%s:%s", host, port)
    })