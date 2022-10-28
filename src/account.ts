import { Address, PrivateKey, Signature, ViewKey } from "@entropy1729/aleo-sdk";

/**
 * Class that represents an Aleo Account with a PrivateKey, from which an Address and a ViewKey derive.
 */
export class Account {
  pk: PrivateKey;
  vk: ViewKey;
  adr: Address;

  constructor(privatekey="") {

    if(privatekey){
      this.pk = PrivateKey.from_string(privatekey);
    }
    else{
      this.pk = new PrivateKey();
    }

    this.vk = ViewKey.from_private_key(this.pk);
    this.adr = Address.from_private_key(this.pk);
  }

  keys() {
    return {
      Address: this.adr.to_string(),
      ViewKey: this.vk.to_string(),
      PrivateKey: this.pk.to_string()
    }
  }

  privateKey() {
    return this.pk;
  }

  viewKey() {
    return this.vk;
  }

  address() {
    return this.adr;
  }

   /**
    * Decrypts a Record given a ciphertext.
    * @param {string} ciphertext
    * @returns {Record}
    */
  decryptRecord(ciphertext: string) {
    return this.vk.decrypt(ciphertext)
  }

  /**
   * Decrypts a set of Records given an array of ciphertexts. 
   * @param {string[]} ciphertexts
   * @returns {Record[]}
   */
  decryptRecords(ciphertexts: string[]) {
    return ciphertexts.map(ciphertext => this.vk.decrypt(ciphertext))
  }
  
  /**
   * Signs a message with the account's private key.
   * Returns a Signature.
   * 
   * @param {Uint8Array} message
   * @returns {Signature}
   */  
  sign(message: Uint8Array) {
    return this.pk.sign(message)
  }

  /**
   * Verifies the Signature on a message.
   * 
   * @param {Uint8Array} message
   * @param {Signature} signature
   * @returns {boolean}
   */
  verify(message: Uint8Array, signature: Signature) {
    return this.adr.verify(message, signature)
  }
}
