import { Account, NodeConnection } from '@entropy1729/aleo-js';

let acc = new Account();

let node = new NodeConnection();
// node.setAccount(acc);
// node.getAccount()
node.getAllRecords()
node.getUnspentRecords()
// node.getSpentRecords()
// node.getAllCiphertexts()
// node.getUnspentCiphertexts()
// node.getSpentCiphertexts()
// node.getLatestBlockHeight()
// node.getLatestBlockHash()
// node.getLatestBlock()
// node.getTransactions()
// node.getTransaction()
// node.getBlock()
// node.getTransactionBroadcast()

export{ Account, NodeConnection };
