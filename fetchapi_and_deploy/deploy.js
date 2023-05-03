
const aptos = require('aptos');
var express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
var urlencodeParser = bodyParser.urlencoded({extended: false});

const packageMetadata = fs.readFileSync("D:/NodeJS/Demo/aptos-core/aptos-move/move-examples/Aptos_ERC20/build/ERC20/package-metadata.bcs");
  const moduleData = fs.readFileSync("D:/NodeJS/Demo/aptos-core/aptos-move/move-examples/Aptos_ERC20/build/ERC20/bytecode_modules/bsc.mv");

    console.log(packageMetadata);
    console.log(moduleData);

const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");
const a1 = {
    address: "0xdb5510f3378a8d97a7f6184a12eeedd884114a611dbce89e381fed9c846f01c6",
    publicKeyHex: "0xe336315f2de3d1e85cc33aaebf5d5cbf737c248d5944cbfcab0f2eae35d029e4",
    privateKeyHex: "0xdb6ac5d5e50cd4509c54306bf0bd79ede7d60d227f85143c16cdc13886a15015"
};

const account1 = aptos.AptosAccount.fromAptosAccountObject(a1);

    app.post('/deploy', urlencodeParser, async function (req, res){
      console.log("Publishing Coin package.");
    let txnHash = await client.publishPackage(account1, new aptos.HexString(packageMetadata.toString("hex")).toUint8Array(), [
    new aptos.TxnBuilderTypes.Module(new aptos.HexString(moduleData.toString("hex")).toUint8Array()),
  ]);
  await client.waitForTransaction(txnHash, { checkSuccess: true }); 

    res.send("contract deployed Coin ");
      
    })
    var server = app.listen(8081, function(){
      var host = server.address().address
      var port = server.address().port
  
      console.log("http://%s:%s",host,port);
  })