// var tweetnacl = require('tweetnacl');


async function signdecode(){

const message = 'hello';
const nonce = 'random_string';

try {
  const response = await window.aptos.signMessage({
    message,
    nonce,
  });
  const { publicKey } = await window.aptos.account();
  // Remove the 0x prefix
  const key = publicKey.slice(2, 66);
  const verified = tweetnacl.sign.detached.verify(
    Buffer.from(response.fullMessage),
    Buffer.from(response.signature, 'hex'),
    Buffer.from(key, 'hex'),
  );
  console.log(verified);
} catch (error) {
  console.error(error);
}
}



console.log("called from here");