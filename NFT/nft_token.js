const aptos = require('aptos');
var express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');
   
var app = express();

var urlencodeParser = bodyParser.urlencoded({extended: false});

const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");

const tokenClient = new aptos.TokenClient(client);
const alice1 = {
    address: "0xead6e178f79cd6e876bba2a4c0bd7e46b0922b37bd4652e9bdf3e357d90cd372",
    publicKeyHex: "0x008a173b671ac380e6a9185270fef5a1275240ef8f910144fdda832f1fd88def",
    privateKeyHex: "0xf16c1f7ef77a0fa716fc76a00923f1d052604cedcc58159360a065c7db92ba51"
}
const bob1 = {
    address: "0x587fcb2814265ffba6a7ddfe0714bfb265201c4ce7fdc4ed3cb8dcd6ff252094",
    publicKeyHex: "0x6feed177c4ce6bf3af3054333ee16fc408849265c5f180885f77a67e86a23f4b",
    privateKeyHex: "0xec09ed824ab8a7eeca9a3f473df54b2b0121fdcb72de2f80855df1b6a182ac23"
}
const alice = aptos.AptosAccount.fromAptosAccountObject(alice1);
const  bob = aptos.AptosAccount.fromAptosAccountObject(bob1);



app.post('/mint_nft', urlencodeParser, async function (req, res){
    console.log("=== network ===");
    console.log("https://fullnode.devnet.aptoslabs.com");

console.log("=== Addresses ===");
console.log(`Alice: ${alice.address()}`);
console.log(`Bob: ${bob.address()}`);
console.log("")

const collectionName = "Coinbase";
const tokenName = "my coinbase token";
const tokenPropertyVersion = 0;

const tokenId = {
    token_data_id: {
      creator: alice.address().hex(),
      collection: collectionName,
      name: tokenName,
    },
    property_version: `${tokenPropertyVersion}`,
};

const txnHash1 = await tokenClient.createCollection(
    alice,
    collectionName,
    "coinbase simple collection",
    "https://alice.com",
); 
await client.waitForTransaction(txnHash1, { checkSuccess: true });

const txnHash2 = await tokenClient.createToken(
    alice,
    collectionName,
    tokenName,
    "Coinbase simple token",
    1,
    "https://nft.coinbase.com/nft/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/33275141225301511534893451241943517971312760339391285841347507324553862850320",
);

await client.waitForTransaction(txnHash2, { checkSuccess: true });

const collectionData = await tokenClient.getCollectionData(alice.address(), collectionName);
console.log(`Alice's collection: ${JSON.stringify(collectionData, null, 4)}`);

const aliceBalance1 = await tokenClient.getToken(
    alice.address(),
    collectionName,
    tokenName,
    `${tokenPropertyVersion}`,
);
console.log(`Alice's token balance: ${aliceBalance1["amount"]}`);

const tokenData = await tokenClient.getTokenData(alice.address(), collectionName, tokenName);
console.log(`Alice's token data: ${JSON.stringify(tokenData, null, 4)}`);

console.log("\n=== Transferring the token to Bob ===");

const txnHash3 = await tokenClient.offerToken(
    alice,
    bob.address(),
    alice.address(),
    collectionName,
    tokenName,
    1,
    tokenPropertyVersion,
  );
  await client.waitForTransaction(txnHash3, { checkSuccess: true });

  const txnHash4 = await tokenClient.claimToken(
    bob,
    alice.address(),
    alice.address(),
    collectionName,
    tokenName,
    tokenPropertyVersion,
  ); 
  await client.waitForTransaction(txnHash4, { checkSuccess: true });

  const aliceBalance2 = await tokenClient.getToken(
    alice.address(),
    collectionName,
    tokenName,
    `${tokenPropertyVersion}`,
  );
  const bobBalance2 = await tokenClient.getTokenForAccount(bob.address(), tokenId);
  console.log(`Alice's token balance: ${aliceBalance2["amount"]}`);
  console.log(`Bob's token balance: ${bobBalance2["amount"]}`);

  console.log("\n=== Transferring the token back to Alice using MultiAgent ===");
  
  let txnHash5 = await tokenClient.directTransferToken(
    bob,
    alice,
    alice.address(),
    collectionName,
    tokenName,
    1,
    tokenPropertyVersion,
  ); 
  await client.waitForTransaction(txnHash5, { checkSuccess: true });

  const aliceBalance3 = await tokenClient.getToken(
    alice.address(),
    collectionName,
    tokenName,
    `${tokenPropertyVersion}`,
  );
  const bobBalance3 = await tokenClient.getTokenForAccount(bob.address(), tokenId);
  console.log(`Parth's token balance: ${aliceBalance3["amount"]}`);
  console.log(`Bob's token balance: ${bobBalance3["amount"]}`);

  const provider = new aptos.Provider(aptos.Network.DEVNET);
  console.log("\n=== Checking if indexer devnet chainId same as fullnode chainId  ===");
  const indexerLedgerInfo = await provider.getIndexerLedgerInfo();
  const fullNodeChainId = await provider.getChainId();

  console.log(
    `\n fullnode chain id is: ${fullNodeChainId}, indexer chain id is: ${indexerLedgerInfo.ledger_infos[0].chain_id}`,
  );

  if (indexerLedgerInfo.ledger_infos[0].chain_id !== fullNodeChainId) {
    console.log(`\n fullnode chain id and indexer chain id are not synced, skipping rest of tests`);
    return;
  }

  console.log("\n=== Getting Alices's NFTs ===");
  const aliceNfts = await provider.getAccountNFTs(alice.address().hex());
  console.log(`Parth current token ownership: ${aliceNfts.current_token_ownerships[0].amount}. Should be 1`);

  console.log("\n=== Getting Bob's NFTs ===");
  const bobNfts = await provider.getAccountNFTs(bob.address().hex());
  console.log(`Bob current token ownership: ${bobNfts.current_token_ownerships.length}. Should be 0`);
})

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("http://%s:%s",host,port);
})