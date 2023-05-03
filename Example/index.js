/* function sum(a,b){
     return a*b;
 }

console.log(sum(2,3))




D:\NodeJS\Demo>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (demo) HP
Sorry, name can no longer contain capital letters.
package name: (demo) hp
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author: ph
license: (ISC)
About to write to D:\NodeJS\Demo\package.json:

{
  "name": "hp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "ph",
  "license": "ISC"
}


Is this OK? (yes) yes
*/

var http = require("http");

http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.end('Hello Parth\n');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');