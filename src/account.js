import { Address, PrivateKey, ViewKey } from "@entropy1729/aleo-sdk";
/**
 * Class that represents an Aleo Account with a PrivateKey, from which an Address and a ViewKey derive.
 * @example
 * let account = new Account();
 */
var Account = /** @class */ (function () {
    function Account(params) {
        if (params === void 0) { params = {}; }
        try {
            this.pk = this.privateKeyFromParams(params);
        }
        catch (e) {
            console.error("Wrong parameter", e);
            throw new Error("Wrong Parameter");
        }
        this.vk = ViewKey.from_private_key(this.pk);
        this.adr = Address.from_private_key(this.pk);
    }
    Account.prototype.privateKeyFromParams = function (params) {
        if (params.seed) {
            return PrivateKey.from_seed_unchecked(params.seed);
        }
        if (params.privateKey) {
            return PrivateKey.from_string(params.privateKey);
        }
        return new PrivateKey();
    };
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
    Account.prototype.keys = function () {
        return {
            Address: this.adr.to_string(),
            ViewKey: this.vk.to_string(),
            PrivateKey: this.pk.to_string()
        };
    };
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
     *
     * @example
     * let account = new Account();
     * let record = account.decryptRecord("record1...");
     */
    Account.prototype.decryptRecord = function (ciphertext) {
        return this.vk.decrypt(ciphertext);
    };
    /**
     * Decrypts a set of Records given an array of ciphertexts.
     * @param {string[]} ciphertexts
     * @returns {Record[]}
     *
     * @example
     * let account = new Account();
     * let record = account.decryptRecords(["record1...", "record2..."]);
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
     *
     * @example
     * let account = new Account();
     * account.sign("a message");
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
     *
     * @example
     * let account = new Account();
     * let message = "a message";
     * let signature = account.sign(message);
     * account.verify(message, signature);
     */
    Account.prototype.verify = function (message, signature) {
        return this.adr.verify(message, signature);
    };
    return Account;
}());
export { Account };
//# sourceMappingURL=account.js.map