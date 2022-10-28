import { Address, PrivateKey, ViewKey } from "@entropy1729/aleo-sdk";
/**
 * Class that represents an Aleo Account with a PrivateKey, from which an Address and a ViewKey derive.
 */
var Account = /** @class */ (function () {
    function Account() {
        this.pk = new PrivateKey();
        this.vk = ViewKey.from_private_key(this.pk);
        this.adr = Address.from_private_key(this.pk);
    }
    Account.prototype.privateKey = function () {
        return this.pk;
    };
    Account.prototype.viewKey = function () {
        return this.vk;
    };
    Account.prototype.address = function () {
        return this.adr;
    };
    /**
     * Decrypts a Record given a ciphertext.
     * @param {string} ciphertext
     * @returns {Record}
     */
    Account.prototype.decryptRecord = function (ciphertext) {
        return this.vk.decrypt(ciphertext);
    };
    /**
     * Decrypts a set of Records given an array of ciphertexts.
     * @param {string[]} ciphertexts
     * @returns {Record[]}
     */
    Account.prototype.decryptRecords = function (ciphertexts) {
        var _this = this;
        return ciphertexts.map(function (ciphertext) { return _this.vk.decrypt(ciphertext); });
    };
    /**
     * Signs a message with the account's private key.
     * Returns a Signature.
     *
     * @param {Uint8Array} message
     * @returns {Signature}
     */
    Account.prototype.sign = function (message) {
        return this.pk.sign(message);
    };
    /**
     * Verifies the Signature on a message.
     *
     * @param {Uint8Array} message
     * @param {Signature} signature
     * @returns {boolean}
     */
    Account.prototype.verify = function (message, signature) {
        return this.adr.verify(message, signature);
    };
    return Account;
}());
export { Account };
//# sourceMappingURL=account.js.map