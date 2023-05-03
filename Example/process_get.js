var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/index_get.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index_get.htm" );
})

app.get('/process_get', function (req, res) {
   
   response = {
      addreses:req.query.addreses,
      coin:req.query.coin
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})