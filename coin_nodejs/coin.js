const fetch = require('node-fetch');
const aptos = require('aptos');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.urlencoded());
var urlencodeParser = bodyParser.urlencoded({extended: false});

app.get('/coin_in.htm', function(req,res){
    res.sendFile( __dirname + "/" + "coin_in.htm");
})

const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");
const a1 = {
    address: "0xdb5510f3378a8d97a7f6184a12eeedd884114a611dbce89e381fed9c846f01c6",
   publicKeyHex: "0xe336315f2de3d1e85cc33aaebf5d5cbf737c248d5944cbfcab0f2eae35d029e4",
   privateKeyHex: "0xdb6ac5d5e50cd4509c54306bf0bd79ede7d60d227f85143c16cdc13886a15015"
};
const account1 = aptos.AptosAccount.fromAptosAccountObject(a1);

app.get('/get',async function(req, res){
    var get_api = await fetch("https://fullnode.devnet.aptoslabs.com/v1/accounts/0xdb5510f3378a8d97a7f6184a12eeedd884114a611dbce89e381fed9c846f01c6/resource/0x1::coin::CoinInfo%3C0xdb5510f3378a8d97a7f6184a12eeedd884114a611dbce89e381fed9c846f01c6::bsc::BSC%3E");
    const body = await get_api.json();
    console.log(body);
    res.end(JSON.stringify(body));
    })


app.post('/register', urlencodeParser, async  function (req, res){
    

    const payload = {
        type: "entry_function_payload",
        function: "0xdb5510f3378a8d97a7f6184a12eeedd884114a611dbce89e381fed9c846f01c6::bsc::register",
        type_arguments: [],
        arguments: [],
      };
      const txnRequest = await client.generateTransaction(account1.address(), payload);
      const signedTxn = await client.signTransaction(account1, txnRequest);
      console.log(signedTxn);
      const transactionRes = await client.submitTransaction(signedTxn);
        await client.waitForTransaction(transactionRes.hash);
        console.log(transactionRes);
        res.end(JSON.stringify(transactionRes));
    })
    app.post('/mint', urlencodeParser, async  function (req, res){
    

        const payload = {
            type: "entry_function_payload",
            function: "0xdb5510f3378a8d97a7f6184a12eeedd884114a611dbce89e381fed9c846f01c6::bsc::mint_coin",
            type_arguments: [],
            arguments: [req.body.user.address,req.body.user.amount],
          };
          
        const txnRequest = await client.generateTransaction(account1.address(),payload);
        const signedtxn = await client.signTransaction(account1,txnRequest);
        console.log(signedtxn);
        const txnres = await client.submitTransaction(signedtxn);
        await client.waitForTransaction(txnres.hash);
        console.log(txnres);
        res.end(JSON.stringify(txnres));
        })

    app.post('/burn', urlencodeParser, async  function (req, res){
    

        const payload = {
            type: "entry_function_payload",
            function: "0xdb5510f3378a8d97a7f6184a12eeedd884114a611dbce89e381fed9c846f01c6::bsc::burn_coin",
            type_arguments: [],
            arguments : [req.body.user.amt],
        };

        const txnReq = await client.generateTransaction(account1.address(),payload);
        const signtxn = await client.signTransaction(account1, txnReq);
        console.log(signtxn);
        const Txnresponse = await client.submitTransaction(signtxn);
        await client.waitForTransaction(Txnresponse.hash);
        console.log(Txnresponse);
        res.end(JSON.stringify(Txnresponse));
        })

    app.post('/freeze', urlencodeParser, async  function (req, res){
    

        const payload = {
            type: "entry_function_payload",
            function: "0xdb5510f3378a8d97a7f6184a12eeedd884114a611dbce89e381fed9c846f01c6::bsc::freeze_self",
            type_arguments: [],
            arguments: [],
            };
            const txnRequest = await client.generateTransaction(account1.address(), payload);
            const signedTxn = await client.signTransaction(account1, txnRequest);
            console.log(signedTxn);
            const transactionRes = await client.submitTransaction(signedTxn);
            await client.waitForTransaction(transactionRes.hash);
            console.log(transactionRes);
            res.end(JSON.stringify(transactionRes));
        })
    app.post('/emer_freeze', urlencodeParser, async  function (req, res){
    

        const payload = {
            type: "entry_function_payload",
            function: "0xdb5510f3378a8d97a7f6184a12eeedd884114a611dbce89e381fed9c846f01c6::bsc::emergency_freeze",
            type_arguments: [],
            arguments: [req.body.user.ef],
            };
            const txnRequest = await client.generateTransaction(account1.address(), payload);
            const signedTxn = await client.signTransaction(account1, txnRequest);
            console.log(signedTxn);
            const transactionRes = await client.submitTransaction(signedTxn);
            await client.waitForTransaction(transactionRes.hash);
            console.log(transactionRes);
            res.end(JSON.stringify(transactionRes));
        })

    app.post('/unfreeze', urlencodeParser, async  function (req, res){
    

        const payload = {
            type: "entry_function_payload",
            function: "0xdb5510f3378a8d97a7f6184a12eeedd884114a611dbce89e381fed9c846f01c6::bsc::unfreeze",
            type_arguments: [],
            arguments: [req.body.user.uf],
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