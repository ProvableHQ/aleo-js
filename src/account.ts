import { Address, PrivateKey, Signature, ViewKey } from "@entropy1729/aleo-sdk";

/**
 * Class that represents an Aleo Account with a PrivateKey, from which an Address and a ViewKey derive.
 * @example
 * let account = new Account();
 *
 */
export class Account {
  pk: PrivateKey;
  vk: ViewKey;
  adr: Address;

  constructor(privatekey = "") {
    this.pk = privatekey
      ? PrivateKey.from_string(privatekey)
      : new PrivateKey();
    this.vk = ViewKey.from_private_key(this.pk);
    this.adr = Address.from_private_key(this.pk);
  }

  /**
   * Creates an account from a seed.
   * Seed must be 32 bytes long.
   * @param {Uint8Array} seed
   * @returns {Account}
   *
   * @example
   * let account = new Account();
   * let record = account.decryptRecord("record1...");
   */
  fromSeed(seed: Uint8Array) {
    try {
      this.pk = PrivateKey.from_seed_unchecked(seed);
      this.vk = ViewKey.from_private_key(this.pk);
      this.adr = Address.from_private_key(this.pk);
    } catch (e) {
      console.log("Non valid seed: ", e);
    }
  }
  keys() {
    return {
      Address: this.adr.to_string(),
      ViewKey: this.vk.to_string(),
      PrivateKey: this.pk.to_string(),
    };
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
   *
   * @example
   * let account = new Account();
   * let record = account.decryptRecord("record1...");
   */
  decryptRecord(ciphertext: string) {
    return this.vk.decrypt(ciphertext);
  }

  /**
   * Decrypts a set of Records given an array of ciphertexts.
   * @param {string[]} ciphertexts
   * @returns {Record[]}
   *
   * @example
   * let account = new Account();
   * let record = account.decryptRecords(["record1...", "record2..."]);
   */
  decryptRecords(ciphertexts: string[]) {
    return ciphertexts.map((ciphertext) => this.vk.decrypt(ciphertext));
  }

  /**
   * Signs a message with the account's private key.
   * Returns a Signature.
   *
   * @param {Uint8Array} message
   * @returns {Signature}
   *
   * @example
   * let account = new Account();
   * account.sign("a message");
   */
  sign(message: Uint8Array) {
    return this.pk.sign(message);
  }

  /**
   * Verifies the Signature on a message.
   *
   * @param {Uint8Array} message
   * @param {Signature} signature
   * @returns {boolean}
   *
   * @example
   * let account = new Account();
   * let message = "a message";
   * let signature = account.sign(message);
   * account.verify(message, signature);
   */
  verify(message: Uint8Array, signature: Signature) {
    return this.adr.verify(message, signature);
  }
}
