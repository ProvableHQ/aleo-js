import fetch from "unfetch";
import { Account } from "./account";
import { Transaction, Transactions, Block, Ciphertext } from "@entropy1729/aleo-sdk";


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
    this.host = host + "/testnet3";
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

  /**
   * Returns de information of the setted account
   *
   * @example
   * let account = connection.getAccount(account);
   */
   getAccount(): Account | undefined {
    return this.account;
  }

  async useFetchData<Type>(
    url: string = "/",
    method: string = "GET",
    body: string = "",
    headers: Record<string, string> = { "Content-Type": "application/json" }
  ): Promise<Type | Error> {
    let response = await fetch(this.host + url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    });
    try {
      return await response.json();
    } catch (error) {
      return new Error("ERROR");
    }
  }

  /**
   * Returns all of the ciphertexts for the setted account
   *
   * @example
   * let cyphertexts = connection.getAllCiphertexts();
   */
  async getAllCiphertexts(): Promise<Array<Ciphertext> | Error> {
    return await this.useFetchData<Array<Ciphertext>>(
      "/ciphertexts/all",
      "POST",
      this.account?.viewKey().to_string()
    );
  }

  /**
   * Returns the unspent ciphertexts for the setted account
   *
   * @example
   * let cyphertexts = connection.getUnspentCiphertexts();
   */
  async getUnspentCiphertexts(): Promise<Array<Ciphertext> | Error> {
    return await this.useFetchData<Array<Ciphertext>>(
      "/ciphertexts/unspent",
      "POST",
      this.account?.viewKey().to_string()
    );
  }

  /**
   * Returns the spent ciphertexts for the setted account
   *
   * @example
   * let cyphertexts = connection.getSpentCiphertexts();
   */
  async getSpentCiphertexts(): Promise<Array<Ciphertext> | Error> {
    return await this.useFetchData<Array<Ciphertext>>(
      "/ciphertexts/spent",
      "POST",
      this.account?.viewKey().to_string()
    );
  }

  /**
   * Returns the latest height of the blockchain
   *
   * @example
   * let latestHeight = connection.getLatestHeight();
   */
  async getLatestHeight(): Promise<number | Error> {
    return await this.useFetchData<number>("/latest/height");
  }

  /**
   * Returns the latest hash of the blockchain
   *
   * @example
   * let latestHash = connection.getLatestHash();
   */
  async getLatestHash(): Promise<string | Error> {
    return await this.useFetchData<string>("/latest/hash");
  }

  /**
   * Returns the latest block of the blockchain
   *
   * @example
   * let latestHeight = connection.getLatestBlock();
   */
  async getLatestBlock(): Promise<Block | Error> {

    let block = await this.useFetchData<Block>("/latest/block");
    console.log(block);
    console.log(typeof(block));
    return block;
  }

  /**
   * Returns the transactions by block
   *
   * @param {number} height
   * @example
   * let transactions = connection.getTransactions(654);
   */
  async getTransactions(height: number): Promise<Array<Transaction> | Error> {
    return await this.useFetchData<Array<Transaction>>("/transactions/" + height);
  }

  /**
   * Returns a transaction by id
   *
   * @param {string} id
   * @example
   * let transaction = connection.getTransaction("at1handz9xjrqeynjrr0xay4pcsgtnczdksz3e584vfsgaz0dh0lyxq43a4wj");
   */
  async getTransaction(id: string): Promise<Transaction | Error> {
    return await this.useFetchData<Transaction>("/transaction/" + id);
  }

  /**
   * Returns a transaction by block number
   *
   * @param {number} id
   * @example
   * let block = connection.getBlock(1234);
   */
  async getBlock(id: number): Promise<Block | Error> {
    return await this.useFetchData<Block>("/block/" + id);
  }
}

export default NodeConnection;
