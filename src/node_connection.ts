import fetch from 'unfetch'
import {Account} from "./account";

export class NodeConnection {
  host: string;
  account: Account | undefined;

  constructor(host: string) {
    this.host = host + '/testnet3';
  }

  setAccount(account: Account) {
    this.account = account;
  }

  async useFetchData(
    url: string='/',
    method: string='GET',
    body: string="",
    headers: Record<string, string>= {'Content-Type': 'application/json'},
  ){
    let response =  await fetch(this.host + url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    });
    try {
      return await response.json();  
    } catch (error){
      return error;
    }
  }

  getAccount(){
    return {
      Address: this.account?.address().to_string(), 
      ViewKey:this.account?.viewKey().to_string(),
      PrivateKey: this.account?.privateKey().to_string()
    };
  }

  async getAllCiphertexts(){
    return await this.useFetchData('/ciphertexts/all', 'POST', this.account?.viewKey().to_string());
  }

  async getUnspentCiphertexts(){
    return await this.useFetchData('/ciphertexts/unspent', 'POST', this.account?.viewKey().to_string());
  }

  async getSpentCiphertexts(){
    return await this.useFetchData('/ciphertexts/spent', 'POST', this.account?.viewKey().to_string());
  }

  async getLatestHeight(){
    return await this.useFetchData('/latest/height');
  }

  async getLatestHash(){
    return await this.useFetchData('/latest/hash');
  }

  async getLatestBlock(){
    return await this.useFetchData('/latest/block');
  }

  async getTransactions(height: number){
    return await this.useFetchData('/transactions/' + height);
  }

  async getTransaction(id: string){
    return await this.useFetchData('/transaction/' + id);
  }

  async getBlock(id: number){
    return await this.useFetchData('/block/' + id);
  }
}

export default NodeConnection;
