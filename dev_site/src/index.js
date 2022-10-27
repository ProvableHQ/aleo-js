import { Account, NodeConnection } from '@entropy1729/aleo-js';

let acc = new Account();

let node = new NodeConnection();
console.log(acc);

console.log(node);

console.log(node.getRecords())

export{ Account, NodeConnection };
