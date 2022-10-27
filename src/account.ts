import { Address, PrivateKey, ViewKey } from "@entropy1729/aleo-sdk";

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
}
