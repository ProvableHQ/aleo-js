import { Address, PrivateKey, Signature, ViewKey } from "@entropy1729/aleo-sdk";

export class Account {
  pk: PrivateKey;
  vk: ViewKey;
  adr: Address;

  constructor() {
    this.pk = new PrivateKey();
    this.vk = ViewKey.from_private_key(this.pk);
    this.adr = Address.from_private_key(this.pk);
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
    * @param {string} ciphertext
    * @returns {Record}
    */
  decryptRecord(ciphertext: string) {
    return this.vk.decrypt(ciphertext)
  }

  /**
    * @param {string[]} ciphertexts
    * @returns {Signature}
    */
  decryptRecords(ciphertexts: string[]) {
    return ciphertexts.map(ciphertext => this.vk.decrypt(ciphertext))
  }
  
  /**
    * @param {Uint8Array} message
    * @returns {Signature}
    */  
  sign(message: Uint8Array) {
    return this.pk.sign(message)
  }

  /**
    * @param {Uint8Array} message
    * @param {Signature} signature
    * @returns {boolean}
    */
  verify(message: Uint8Array, signature: Signature) {
    return this.adr.verify(message, signature)
  }
}

export default Account;
