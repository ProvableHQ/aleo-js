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
}

export default Account;
