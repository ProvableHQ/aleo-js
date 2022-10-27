import fetch from 'unfetch'
import Account from "./account";

export class NodeConnection {
  host: string;
  account: Account | undefined;

  constructor(host: string = "http://34.217.100.97/testnet3") {
    this.host = host;
  }

  setAccount(account: Account) {
    console.log("setting account")
    this.account = account;
  }

  useFetchData(
    url: string='/',
    method: string='GET',
    body?: string,
    headers: Record<string, string>= {'Content-Type': 'application/json'},
  ){
    fetch(this.host + url, {
      method: method,
      headers: headers,
      body: body
    }).then( response => {
      return response.json();
    })
  }

  getAccount(){
    return this.account;
  }

  getRecords(){
    return this.useFetchData('/records/all', 'POST', this.account?.viewKey().to_string());
  }

  getUnspentRecords(){
    return this.useFetchData('/records/unspent', 'POST', this.account?.viewKey().to_string());
  }

  getSpentRecords(){
    return this.useFetchData('/records/spent', 'POST', this.account?.viewKey().to_string());
  }

  getLatestBlockHeight(){
    // get max height
    let height = 0;
    return this.useFetchData('/latest/block/' + height);
  }

  getLatestBlockHash(){
    return this.useFetchData('/latest/block/hash');
  }

  getLatestBlock(){
    return this.useFetchData('/latest/block');
  }

  getTransactions(){
    return this.useFetchData('/transactions');
  }

  getTransaction(id: string){
    return this.useFetchData('/transaction/' + id);
  }

  getBlock(id: string){
    return this.useFetchData('/block/' + id);
  }

  getStatePath(commitment: string){
    return this.useFetchData('/statePath/' + commitment);
  }

  getTransactionBroadcast(){
    return this.useFetchData('/transaction/broadcast', 'POST');
  } 
}

export default NodeConnection;
