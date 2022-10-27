import { Address, PrivateKey, ViewKey } from "@entropy1729/aleo-sdk";
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
    return Account;
}());
export { Account };
//# sourceMappingURL=account.js.map