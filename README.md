<img src="./public/aleo.svg" alt="drawing" width="60"/>

# Aleo.js

## Aleo utilities in JavaScript

Aleo high-level utilities in javascript to handle Accounts and Node connections in the browser.

Makes use of [Aleo-SDK](https://www.npmjs.com/package/@entropy1729/aleo-sdk) under the hood.

This package provides the following structures to work with:

1. [Account](https://entropy1729.github.io/aleo-js/Account.html)
2. [Node Connection](https://entropy1729.github.io/aleo-js/NodeConnection.html)

If you'd like to read more about Aleo accounts, private keys, etc., you may refer to [Aleo's docs](https://developer.aleo.org/concepts/accounts)

Happy hacking!

## Getting Started

1. To build the project, go to the project's root and execute `npm run build`.
2. To start the development server, execute `cd dev_site && npx webpack build` to run webpack, and then `npm run dev`

You can now connect to `localhost:4000` and start using Aleo.JS functionalities!

For example, you could try the following in the browser console:

```javascript
>> const {Account, NodeConnection} = await AleoJS

>> let account = new Account()

>> account.address().to_string()

>> let connection = new NodeConnection("http://localhost:4130") // Or your node's IP or domain

>> connection.setAccount(account)

>> connection.getUnspentCiphertexts().then( (cyphers) => console.log(cyphers))

>> connection.getUnspentCiphertexts().then( (cyphers) => console.log(account.decryptRecord(cyphers[0]).to_string()))
```

## Extra Aleo Tools

[Aleo SDK account generator](https://aleohq.github.io/aleo/)

[Aleo SDK repo (Entropy1729 fork)](https://github.com/Entropy1729/aleo)

[Aleo web](https://www.aleo.org/)

You can visit the [SnarkVM repo](https://github.com/AleoHQ/snarkVM) and [SnarkOS repo](https://github.com/AleoHQ/snarkOS) to go deep into the code of aleo infrastructure
