const fetch = require('node-fetch');
const aptos = require('aptos');
var express = require("express");
var bodyParser = require('body-parser');

var app = express();
var urlencodeParser = bodyParser.urlencoded({ extended: false})

const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");
const a1 = {
    address: "0x6bdc920fcaad294c6030a827c45ef7e0fe69f340307b883b74c182bbd8eac7fb",
    publicKeyHex: "0x5bb8f22998fc1d2fa984e80998fcfc5c14d7aee7ef46e4e6f0e39c12bf7bc93c",
    privateKeyHex: "0x19a3ed4f2db902fcc85e514b32767a614d2970d7cbc47be4c04ff85b47cff481"
};
const account1 = aptos.AptosAccount.fromAptosAccountObject(a1);
fetch("https://fullnode.devnet.aptoslabs.com/v1/accounts/0x6bdc920fcaad294c6030a827c45ef7e0fe69f340307b883b74c182bbd8eac7fb/resource/0x6bdc920fcaad294c6030a827c45ef7e0fe69f340307b883b74c182bbd8eac7fb::message::MessageHolder")
    .then((res) => res.json())
    .then((res) => console.log(res));

    app.post('/', urlencodeParser, async  function (req, res){
    

    const payload = {
        type: "entry_function_payload",
        function: "0x6bdc920fcaad294c6030a827c45ef7e0fe69f340307b883b74c182bbd8eac7fb::message::set_message",
        type_arguments: [],
        arguments: ["Parth,Hirani"],
      };
      const txnRequest = await client.generateTransaction(account1.address(), payload);
      const signedTxn = await client.signTransaction(account1, txnRequest);
      console.log(signedTxn);
      const transactionRes = await client.submitTransaction(signedTxn);
        await client.waitForTransaction(transactionRes.hash);
        console.log(transactionRes);
        res.end(JSON.stringify(transactionRes));
    })
    var server = app.listen(8081, function(){
        var host = server.address().address
        var port = server.address().port
    
        console.log("example app listening at http://%s:%s", host, port)
    })




  