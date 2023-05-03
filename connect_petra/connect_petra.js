/*const aptos = require('aptos');
var express = require('express');
//const fs = require('fs');
let bodyParser = require('body-parser');

var app = express();
app.use(express.urlencoded());
var urlencodeParser = bodyParser.urlencoded({extended: false});
app.get('/connect.html', function(req,res){
  res.sendFile( __dirname + "/" + "connect.html");
})

const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");

const tokenClient = new aptos.TokenClient(client);


app.post('/mint', urlencodeParser, async function (req, res){
  const alice1 = {
    address: req.body.user.Address,
    publicKeyHex: req.body.user.Publickey,
    privateKeyHex: req.body.user.Privatekey,
};
const alice = aptos.AptosAccount.fromAptosAccountObject(alice1);
    console.log("=== network ===");
    console.log("https://fullnode.devnet.aptoslabs.com");

console.log("=== Addresses ===");
console.log(`Alice: ${alice.address()}`);

console.log("")


console.log("=== Creating Collection and Token ===");

const collectionName = "ABC";
const tokenName = "abc";
const description = "";
const tokenPropertyVersion = 0;

const tokenId = {
    token_data_id: {
      creator: alice.address().hex(),
      collection: collectionName,
      name: tokenName,
      desc: description,
    },
    property_version: `${tokenPropertyVersion}`,
};

const txnHash1 = await tokenClient.createCollection(
    alice,
    collectionName,
    "Parth first collection",
    "https://parth.com",
); // <:!:section_4
await client.waitForTransaction(txnHash1, { checkSuccess: true });

const txnHash2 = await tokenClient.createToken(
    alice,
    collectionName,
    tokenName,
    "Parth first token",
    1,
    "https://aptos.dev/img/nyan.jpeg",
); // <:!:section_5
await client.waitForTransaction(txnHash2, { checkSuccess: true });

const collectionData = await tokenClient.getCollectionData(alice.address(), collectionName);
console.log(`Parth collection: ${JSON.stringify(collectionData, null, 4)}`);

const aliceBalance1 = await tokenClient.getToken(
    alice.address(),
    collectionName,
    tokenName,
    `${tokenPropertyVersion}`,
);
console.log(`Parth token balance: ${aliceBalance1["amount"]}`);

const tokenData = await tokenClient.getTokenData(alice.address(), collectionName, tokenName);
console.log(`Parth token data: ${JSON.stringify(tokenData, null, 4)}`);
res.end(JSON.stringify(tokenData))


})

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("http://localhost:%s",host,port);
})*/
//................................................................................................


const aptos = require('aptos');
var express = require('express');

let bodyParser = require('body-parser');

var app = express();
app.use(express.urlencoded());
var urlencodeParser = bodyParser.urlencoded({extended: false});
app.get('/connect.html', function(req,res){
  res.sendFile( __dirname + "/" + "connect.html");
})

const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");

const tokenClient = new aptos.TokenClient(client);


app.post('/mint', urlencodeParser, async function (req, res){
  const alice1 = {
    address: req.body.user.Address,
    publicKeyHex: req.body.user.Publickey,
    privateKeyHex: req.body.user.Privatekey,
};
const alice = aptos.AptosAccount.fromAptosAccountObject(alice1);
    console.log("=== network ===");
    console.log("https://fullnode.devnet.aptoslabs.com");

console.log("=== Addresses ===");
console.log(`Alice: ${alice.address()}`);

console.log("")


console.log("=== Creating Collection and Token ===");

const collectionName =req.body.user.Collection;
const tokenName = req.body.user.Token;
const description = req.body.user.Description;

const tokenPropertyVersion = req.body.user.Supply;
const icon = req.body.user.Icon;

const txnHash1 = await tokenClient.createCollection(
    alice,
    collectionName,
    "my NFT Token",
    "https://parth.com",
); 
await client.waitForTransaction(txnHash1, { checkSuccess: true });

const txnHash2 = await tokenClient.createToken(
    alice,
    collectionName,
    tokenName,
    description,
    1,
    icon,
); 
await client.waitForTransaction(txnHash2, { checkSuccess: true });

const collectionData = await tokenClient.getCollectionData(alice.address(), collectionName);
console.log(`Parth collection: ${JSON.stringify(collectionData, null, 4)}`);

const aliceBalance1 = await tokenClient.getToken(
    alice.address(),
    collectionName,
    tokenName,
    `${tokenPropertyVersion}`,
);
console.log(`Parth token balance: ${aliceBalance1["amount"]}`);

const tokenData = await tokenClient.getTokenData(alice.address(), collectionName, tokenName);
console.log(`Parth token data: ${JSON.stringify(tokenData, null, 4)}`);
res.end(JSON.stringify(tokenData))

})

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("http://localhost:%s",host,port);
}) 



