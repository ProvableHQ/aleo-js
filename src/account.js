import { Address, PrivateKey, ViewKey } from "@entropy1729/aleo-sdk";

class Account {
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
  decryptRecord(ciphertext) {
    return this.vk.decrypt(ciphertext)
  }

  /**
    * @param {stringArray} ciphertexts
    * @returns {Signature}
    */
  decryptRecords(ciphertexts) {
    return ciphertexts.map(ciphertext => this.vk.decrypt(ciphertext))
  }
  
  /**
    * @param {Uint8Array} message
    * @returns {Signature}
    */  
  sign(message) {
    return this.pk.sign(message)
  }

  /**
    * @param {Uint8Array} message
    * @param {Signature} signature
    * @returns {boolean}
    */
  verify(message, signature) {
    return this.adr.verify(message, signature)
  }
}

export default Account;
