import fetch from 'unfetch'
import {Account} from "./account";

/**
 * Class that represents an Aleo Node Connection and allows us to communicate with the node.
 * 
 * @param {string} host
 * @example
 * let connection = new NodeConnection("localhost:4130");
 */ 
export class NodeConnection {
  host: string;
  account: Account | undefined;

  constructor(host: string) {
    this.host = host + '/testnet3';
  }

  /**
   * Set an account inside the conecction
   * 
   * @param {Account} account
   * @example
   * let account = new Account();
   * connection.setAccount(account);
   */ 
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

  /**
   * Returns de information of the setted account
   * 
   * @example
   * let account = connection.getAccount(account);
   */ 
  getAccount(){
    return {
      Address: this.account?.address().to_string(), 
      ViewKey:this.account?.viewKey().to_string(),
      PrivateKey: this.account?.privateKey().to_string()
    };
  }

  /**
   * Returns all of the ciphertexts for the setted account
   * 
   * @example
   * let cyphertexts = connection.getAllCiphertexts();
   */
  async getAllCiphertexts(){
    return await this.useFetchData('/ciphertexts/all', 'POST', this.account?.viewKey().to_string());
  }

  /**
   * Returns the unspent ciphertexts for the setted account
   * 
   * @example
   * let cyphertexts = connection.getUnspentCiphertexts();
   */
  async getUnspentCiphertexts(){
    return await this.useFetchData('/ciphertexts/unspent', 'POST', this.account?.viewKey().to_string());
  }

  /**
   * Returns the spent ciphertexts for the setted account
   * 
   * @example
   * let cyphertexts = connection.getSpentCiphertexts();
   */
  async getSpentCiphertexts(){
    return await this.useFetchData('/ciphertexts/spent', 'POST', this.account?.viewKey().to_string());
  }

  /**
   * Returns the latest height of the blockchain
   * 
   * @example
   * let latestHeight = connection.getLatestHeight();
   */
  async getLatestHeight(){
    return await this.useFetchData('/latest/height');
  }

  /**
   * Returns the latest hash of the blockchain
   * 
   * @example
   * let latestHash = connection.getLatestHash();
   */
  async getLatestHash(){
    return await this.useFetchData('/latest/hash');
  }

  /**
   * Returns the latest block of the blockchain
   * 
   * @example
   * let latestHeight = connection.getLatestBlock();
   */
  async getLatestBlock(){
    return await this.useFetchData('/latest/block');
  }

  /**
   * Returns the transactions by block
   * 
   * @param {number} height
   * @example
   * let transactions = connection.getTransactions(654);
   */
  async getTransactions(height: number){
    return await this.useFetchData('/transactions/' + height);
  }

  /**
   * Returns a transaction by id
   * 
   * @param {string} id
   * @example
   * let transaction = connection.getTransaction("at1handz9xjrqeynjrr0xay4pcsgtnczdksz3e584vfsgaz0dh0lyxq43a4wj");
   */
  async getTransaction(id: string){
    return await this.useFetchData('/transaction/' + id);
  }

  /**
   * Returns a transaction by block number
   * 
   * @param {number} id
   * @example
   * let block = connection.getBlock(1234);
   */
  async getBlock(id: number){
    return await this.useFetchData('/block/' + id);
  }
}

export default NodeConnection;
